
function HeadersCreate({ headers, extraClasses = "" }) {
    return (headers.map((item, counter) => <th key={counter} className={extraClasses}>{item}</th>))
}

export default HeadersCreate