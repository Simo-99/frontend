import Year from './Year'
function YearCell({ year, value = year, colSpan = 1, extraClasses = "", cellClasses = "" }) {

    return (<td colSpan={colSpan} className={cellClasses}><Year year={year} value={value} extraClasses={extraClasses} /></td>)
}

export default YearCell