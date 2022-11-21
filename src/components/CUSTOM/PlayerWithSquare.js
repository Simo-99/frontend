import { NavLink } from 'react-router-dom';

function PlayerWithSquare({ player }) {
    return (
        <td>
            <span className="btn mx-1" style={{ background: player.color, display: "inline-block" }}></span>
            <NavLink className="nav-link d-inline" to={"/players/" + player.id + "/submits"}>{player.name}</NavLink>
        </td>
    )
}
export default PlayerWithSquare