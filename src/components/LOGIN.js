import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAxios, getToken } from "../utility";
import { setStorage } from '../storage';

const LOGIN = () => {

    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");

    const navigate = useNavigate()

    useEffect(() => { if (getToken() !== undefined) navigate("/players") }, [navigate]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const response = await UseAxios("/login", "POST", { username: username, password: pwd });
        setStorage("user", JSON.stringify({ token: response.token, role: response.user.role }));
        navigate(0);

    }

    return (

        <div className="container w-25 background py-5">
            <br /> <br />

            <form onSubmit={handleSubmit}>

                <div className="form-floating my-1">
                    <input
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Username" />
                    <label htmlFor='floatingInput'>Username</label>

                </div>

                <div className="form-floating my-1">
                    <input
                        type="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>

                </div>

                <div className="form-floating my-2">
                    <button className="btn w-100 btn-primary btn-block">Login</button>
                </div>
            </form>
        </div>

    )
}

export default LOGIN