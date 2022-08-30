import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import LoadMoreBtn from './js/loadMore'
import NewApiService from './js/news-api-server'

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.gallery'),
}



const loadMoreBtn = new LoadMoreBtn({
selector : '[data-action="load-more"]',
hidden: true,
});


const newApiService = new NewApiService()

refs.searchForm.addEventListener('submit' , onSearch)
loadMoreBtn.refs.button.addEventListener('click' , onLoadMore)

 function onSearch (e) {
    e.preventDefault()
    
    clearRenderGallery();

    newApiService.query = e.currentTarget.elements.query.value
    
    if (newApiService.query.length === '') {
      return alert('Erorr');
      }
    loadMoreBtn.show();
    newApiService.resetPage()
    newApiService.fetchArticles().then(renderGallery)
    // new SimpleLightbox('.gallery a').refresh();
    clearRenderGallery()
    fetchArticles()
   
}


function fetchArticles(){
  loadMoreBtn.disabled();
  loadMoreBtn.enable();
}

 function onLoadMore () {
    
    newApiService.fetchArticles().then(renderGallery)
    // new SimpleLightbox('.gallery a').refresh();
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







