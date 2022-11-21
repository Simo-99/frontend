import { NavLink } from 'react-router-dom';
import { getName } from "../../utility";

function MonthCell({ month, year, value }) {
    return (<td><NavLink className="nav-link outline" to={'/months/' + month + '?y=' + year}>{getName(value)}</NavLink></td>)
}

export default MonthCell