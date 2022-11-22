import { NavLink } from 'react-router-dom';

function Year({ year, value = year, extraClasses }) {
    return (<NavLink className={"nav-link outline d-inline " + extraClasses} to={'/years/' + year}>{value}</NavLink>)
}

export default Year