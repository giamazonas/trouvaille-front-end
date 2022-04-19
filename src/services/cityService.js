import * as tokenService from "../services/tokenService";
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/cities`;

async function create(city) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: city,
  });
  return await res.json();
}

async function getAll() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

async function deleteOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    method: "DELETE",
  });
  return await res.json();
}

async function getOne(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    method: "GET",
  });
  return await res.json();
}

async function update(id, city) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    body: city,
    method: "PUT",
  });
  return await res.json();
}

async function addPlace(cityId, placeId) {
  const res = await fetch(`${BASE_URL}/${cityId}/${placeId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  });
  return await res.json();
}

async function search(formData) {
  const res = await fetch(`${BASE_URL}/cities/?city=${formData.query}`);
  return await res.json();
}

export { create, getAll, deleteOne, update, getOne, search, addPlace };
