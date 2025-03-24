import axios from "axios";

const BASE_URL = "http://localhost:3001";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function _get(url, config = {}) {
  return apiClient.get(url, config);
}

function _delete(url, config = {}) {
  return apiClient.delete(url, config);
}

function _patch(url, data = {}, config = {}) {
  return apiClient.patch(url, data, config);
}

function _post(url, data = {}, config = {}) {
  return apiClient.post(url, data, config);
}

export { _get, _delete, _patch, _post };
