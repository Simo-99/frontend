import { canManage } from "../../utility"
import True from "./True"
function CanManage({ children, otherwise = null }) {

    return (<True condition={canManage()} otherwise={otherwise} >{children}</True>)
}
export default CanManage