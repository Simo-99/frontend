function True({ condition, children, otherwise = null }) {
    return (condition ? children : otherwise)
}
export default True 