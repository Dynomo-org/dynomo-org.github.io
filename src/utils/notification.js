import { notification } from "antd";

export default {
    error: message => notification.error({ description: message }),
    success: message => notification.success({description: message})
}