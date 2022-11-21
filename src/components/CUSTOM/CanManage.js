import { canManage } from "../../utility"
import True from "./True"
function CanManage(props) {

    return (<True condition={canManage()}>{props.children}</True>)
}
export default CanManage