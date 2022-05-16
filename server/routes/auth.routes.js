const router = require("express").Router();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const { validateLogin, generateAuthToken } = require("../utils/index");
const privateKey = process.env.JWTPRIVATEKEY;

router.post("/", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        //Exist User
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(404)
                .send({ message: "Invalid Email or Password" });

        //Validate Password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res
                .status(401)
                .send({ message: "Invalid Email or Password" });
        //Generate JsonWebToken
        const token = generateAuthToken(user._id, privateKey, "7d");
        //Send token
        res.status(200).send({
            data: token,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
module.exports = router;
