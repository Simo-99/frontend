import { Number } from "./"
function NumericCell({ value, extraClasses = "", cellClasses = "" }) {
    return (<td className={cellClasses}><Number className={extraClasses} value={value} /></td>)

}

export default NumericCell