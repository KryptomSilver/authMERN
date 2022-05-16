const router = require("express").Router();
const { User } = require("../models/User");
const { validateCreateUser } = require("../utils/index");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validateCreateUser(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        //User exist
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(409)
                .send({ message: "User with given email already exist" });
        //Hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        //Save user
        await new User({ ...req.body, password: hashPassword }).save();
        //Send message
        return res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
module.exports = router;
