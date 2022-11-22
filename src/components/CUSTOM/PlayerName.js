import { NavLink } from "react-router-dom"

function PlayerName({ player }) {
    return (

        <NavLink to={"/players/" + player.id + "/submits"} style={{ textDecoration: 'none' }}>
            <em className={player.color === "#000000" ? 'outline2' : 'outline'} style={{ color: player.color, display: "inline" }} >
                {" " + player.name}
            </ em >
        </NavLink>
    )
}

export default PlayerName