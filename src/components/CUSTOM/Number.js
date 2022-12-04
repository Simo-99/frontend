
function Number({ value, pre = "", post = "" }) {

    return (<>{pre + Intl.NumberFormat('en-GB').format(value) + post}</>)
}

export default Number