import axios from "axios";
import config from "../../../config";

const instance = axios.create({
  baseURL: "https://my-json-server.typicode.com/gsohn/json-demo-server/"
});

export default instance;