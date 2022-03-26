

export function getCityInfo(cityInfo) {
  return fetch(cityInfo)
  .then(res => res.json())
}