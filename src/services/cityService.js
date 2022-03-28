import axios from "axios";
import * as tokenService from "../services/tokenService";
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/cities`;

function create(city) {
  console.log(city);
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: city,
  }).then((res) => res.json());
}

function getAll() {
  return fetch(BASE_URL).then((res) => res.json());
}

async function deleteOne(id) {
  await axios({
    url: `${BASE_URL}/${id}`,
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    method: "DELETE",
  });
}

function getOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  }).then((res) => res.json());
}

async function update(city) {
  console.log("city service", city);
  console.log("json", JSON.stringify(city));
  const updatedCity = await axios({
    url: `${BASE_URL}/${city._id}`,
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    data: city,
    method: "PUT",
  });
  return updatedCity;
}

function search(formData) {
  return fetch(`${BASE_URL}/api/cities/?city=${formData.query}`).then((res) =>
    res.json()
  );
}

export { create, getAll, deleteOne, update, getOne, search };
