import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import LoadMoreBtn from './js/loadMore'
import NewApiService from './js/news-api-server'
import { ifEmptySearchAlert, ifNoImagesFoundAlert,ifEndOfSearchAlert,ifImagesFoundAlert,ifDublicateSearch } from './js/alert';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.gallery'),
}

let textInput = '';

const loadMoreBtn = new LoadMoreBtn({
selector : '[data-action="load-more"]',
hidden: true,
});


const newApiService = new NewApiService()

refs.searchForm.addEventListener('submit' , onSearch)
loadMoreBtn.refs.button.addEventListener('click' , onLoadMore)

function onSearch(e) {
  e.preventDefault()
    
  clearRenderGallery();

  newApiService.query = e.currentTarget.elements.query.value
   
  textInput = e.currentTarget.elements[0].value.trim()
  refs.articlesContainer.innerHTML = '';
   
  if (textInput && textInput === e.currentTarget.elements[0].value) {
    ifEndOfSearchAlert();
    return;
  } 

  if (textInput === '') {
   ifEmptySearchAlert();
   return;
  } 

  return wellArticles()
}
  


    

function wellArticles() {
  loadMoreBtn.show();
    newApiService.resetPage()
    newApiService.fetchArticles().then(renderGallery)
    clearRenderGallery()
    fetchArticles()
}

function fetchArticles(){
  loadMoreBtn.disabled();
  loadMoreBtn.enable();
}

 function onLoadMore () {
  
  newApiService.fetchArticles().then(renderGallery)
   fetchArticles();
   

   }

 function renderGallery(data) {
    const markupGallery = data.map(({
        webformatURL, largeImageURL,
        tags, likes, views, comments, downloads
    }) => {
        return `
    <a class="gallery-link" href="${largeImageURL}">
          <div class="photo-card">
            <img class="photo-card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes:</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>`  
    }).join('')
   

   
   refs.articlesContainer.insertAdjacentHTML('beforeend', markupGallery);
   new SimpleLightbox('.gallery a').refresh();
    
}


function clearRenderGallery() {
  refs.articlesContainer.innerHTML = ''
}







