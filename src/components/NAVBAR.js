import { NavLink } from "react-router-dom"
import { canManage, getToken } from "../utility";
import logo from "../assets/TRIAL.png";

const NAVBAR = () => {


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarTogglerDemo01">
                    <NavLink className="navbar-brand text-warning mx-2" to="/">
                        <img src={logo} width="50px" alt="" />
                    </NavLink>
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                        <li className="nav-item mx-3"><NavLink className=" bold nav-link  text-success" to="/players">Our Members</NavLink></li>
                        <li className="nav-item mx-3"><NavLink className="bold nav-link  text-success" to="/months">Past Months</NavLink></li>
                        <li className="nav-item mx-3"><NavLink className="bold nav-link  text-success" to="/hall">Hall <i className="bi bi-trophy-fill"></i></NavLink></li>
                        <li className="nav-item mx-3"><NavLink className="bold nav-link  text-success" to="/players/formers">Former Members</NavLink></li>

                        {canManage() ? <li className="bold nav-item mx-3"><NavLink className="nav-link active text-success" to="/players/add">Add A New Player</NavLink></li> : null}
                        {canManage() ? <li className="bold nav-item mx-3"><NavLink className="nav-link active text-success" to="/data">Add Data</NavLink></li> : null}


                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {getToken() ? <li className="nav-item mx-3"><NavLink className=" bold nav-link  text-success" to="/logout">Logout</NavLink></li> : null}
                    </ul>
                </div>
            </div >
        </nav >
    )
}

export default NAVBAR
