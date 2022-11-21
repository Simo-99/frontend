
function Number({ value }) {

    return (<>{Intl.NumberFormat('en-GB',).format(value)}</>)
}

export default Number