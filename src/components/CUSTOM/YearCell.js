import { NavLink } from 'react-router-dom';

function YearCell({ year, value = year }) {

    return (<td><NavLink className="nav-link outline" to={'/years/' + year}>{value}</NavLink></td>)
}

export default YearCell