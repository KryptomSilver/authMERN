import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
    const user = localStorage.getItem("token");
    return (
        <Routes>
            {user && <Route path="/" exact element={<Main />} />}
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/" exact element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;
