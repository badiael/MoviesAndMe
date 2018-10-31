const API_TOKEN = "ef33f02067badcce6e249eb78a553d04";
export function getFilmsFromApiWithSearchedText(text) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}
