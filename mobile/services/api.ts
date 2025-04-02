import axios from "axios";

//http://10.0.0.106:3333  /create

export const api = axios.create({
    baseURL: "http://10.0.0.106:3333"
}) 