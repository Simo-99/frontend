import { Number } from "./"
function NumericCell({ value, extraClasses = "", cellClasses = "", colSpan = 1, label = "" }) {
    return (<td colSpan={colSpan} className={cellClasses}><Number label={label} className={extraClasses} value={value} /></td>)

}

export default NumericCell