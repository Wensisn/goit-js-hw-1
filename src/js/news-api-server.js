export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;

  }

  fetchArticles() {
const url = `https://pixabay.com/api/?key=29490532-fde9d4c0daff56b8071258c00&q=${this.searchQuery}&image_type=photo&per_page=8&page=${this.page}` 

return fetch(url)
.then(r =>r.json())
.then(data => {
  console.log(data)
  this.incrementPage();

  return data.hits
});
}

incrementPage() {
  this.page += 1;
}

resetPage() {
  this.page = 1;
}


get query() {
  return this.searchQuery
}

set query(newQuery) {
  return this.searchQuery = newQuery;
}

}