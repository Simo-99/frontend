import { Icon } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Icon2({ iconName, link, iconSize = "small", ButtonClass = "btn btn-success" }) {
    return (<NavLink className="nav-link d-inline mx-1" to={link}><button type="button" className={ButtonClass}><Icon fontSize={iconSize}>{iconName}</Icon></button></NavLink>)

}

export default Icon2