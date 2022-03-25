// const BASE_URL = "/cities";
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/cities`

function create(city) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(city),
  }).then((res) => res.json());
}

function getAll() {
  return fetch(BASE_URL).then((res) => res.json());
}

function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

function update(city) {
  return fetch(`${BASE_URL}/${city._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(city),
  }).then((res) => res.json());
}

export { create, getAll, deleteOne, update };
