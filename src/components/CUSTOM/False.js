function False({ condition, children, otherwise = null }) {
    return (condition ? otherwise : children)
}
export default False 