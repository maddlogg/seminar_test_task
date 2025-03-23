// const server_url = "http://localhost:3001/seminars";

// async function getData(url = server_url) {
//   try {
//     setIsLoading(true);
//     const res = await fetch(url);

//     if (!res.ok) {
//       throw new Error(res.statusText);
//     }

//     const data = await res.json();
//     setSeminars(data);

//     if (data.Responce === false) {
//       throw new Error("Нет данных");
//     }
//   } catch (error) {
//     console.log(error.message);
//     setError(error.message);
//   } finally {
//     setIsLoading(false);
//   }
// }

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
