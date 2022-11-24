
function Number({ value, label = "" }) {

    return (<>{label + Intl.NumberFormat('en-GB').format(value)}</>)
}

export default Number