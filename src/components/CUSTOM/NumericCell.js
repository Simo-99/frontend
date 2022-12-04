import { Number } from "./"
function NumericCell({ value, extraClasses = "", cellClasses = "", colSpan = 1, pre = "" , post="" }) {
    return (<td colSpan={colSpan} className={cellClasses}><Number pre={pre} post={post} className={extraClasses} value={value} /></td>)

}

export default NumericCell