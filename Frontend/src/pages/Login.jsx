import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {
        fetch("http://localhost:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            if(data.success) {
                localStorage.setItem("token", data.token);
                navigate("/todos");
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={loginUser}>
                Login
            </button>
        </>
    );
}

export default Login;