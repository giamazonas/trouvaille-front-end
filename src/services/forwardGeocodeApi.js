export function getCoordinates(cityInfo) {
  return fetch(cityInfo).then((res) => res.json());
}
