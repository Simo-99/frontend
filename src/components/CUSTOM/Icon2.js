import { Icon } from '@mui/material';

function Icon2({ iconName, iconSize = "small", ButtonClass = "btn btn-success" }) {

    return (<button type="button" className={ButtonClass}><Icon fontSize={iconSize}>{iconName}</Icon></button>)
}

export default Icon2