import { Message } from "element-ui";

function messageTips(message, duration, type) {
  Message({
    message,
    duration,
    type,
  });
}
export {
  //关键
  messageTips,
};
