import { NavLink } from 'react-router-dom';
import { getName } from "../../utility";


function Month({ month, year, extraClasses = "" }) {
    return (<NavLink className={"nav-link outline d-inline " + extraClasses} to={'/months/' + month + '?y=' + year}>{getName(month)}</NavLink>)
}

export default Month