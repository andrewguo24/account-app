import axios from "axios/index";

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5ba051a48c533d0014ea0e59.mockapi.io"

export const getAll = () =>
    axios.get(`${api}/api/v1/records`)

export const create = (body) =>
    axios.post(`${api}/api/v1/records`, body)

export const update = (id, body) =>
    axios.put(`${api}/api/v1/records/${id}`, body)