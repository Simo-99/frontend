import Month from './Month'

function MonthCell({ month, year, extraClasses = "" }) {
    return (<td><Month month={month} year={year} extraClasses={extraClasses} /></td>)
}

export default MonthCell

