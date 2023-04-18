import axios from "axios";
import qs from "qs";

//axios.defaults.withCredentials = true;   //强制带验证

export default function ajax(
  url,
  data = {},
  type = "GET",
  json = false,
  save = false
) {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise;
    if (type === "GET") {
      // 准备url query参数数据
      let dataStr = ""; //数据拼接字符串
      Object.keys(data).forEach((key) => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      // 发送get请求
      if (data) {
        promise = axios({ url, data: qs.stringify(data), method: "get" });
      } else if (data != "{}") {
        promise = axios({ url, method: "get" });
      }
    } else if (type === "POST") {
      console.log("data", data);
      promise = axios({ url, data: qs.stringify(data), method: "post" });
    } else if (type === "PUT") {
      // 发送put请求
      promise = axios({
        url,
        data: qs.stringify(data),
        method: "put",
      });
    } else if (type === "DELETE") {
      // delete
      promise = axios({
        url,
        params: data,
        method: "delete",
        withCredentials: true,
      });
    }
    promise
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        resolve(error.response);
        //失败了调用reject()
        //reject(error)
      });
  });
}
