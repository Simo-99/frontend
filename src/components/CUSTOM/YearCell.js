import Year from './Year'
function YearCell({ year, value = year, extraClasses = "" }) {

    return (<td><Year year={year} value={value} extraClasses={extraClasses} /></td>)
}

export default YearCell