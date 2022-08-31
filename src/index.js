import { fetchImages } from './js/fetchImages';
import { renderGallery } from './js/renderGallery';
import { ifEmptySearchAlert, ifNoImagesFoundAlert,ifEndOfSearchAlert,ifImagesFoundAlert,ifDublicateSearch } from './js/notiflix';


import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form : document.getElementById('search-form'),
 input : document.querySelector('input[name="searchQuery"]'),
 gallery : document.querySelector('.gallery'),
 loadMoreBtn : document.querySelector('.load-more'),
}

let page = 0 ; 
let textInput = '';
let simpleLightBox;

function Submit(e) {
  e.preventDefault();
  page = 1
  window.scrollTo({ top: 0 });

  if (textInput && textInput === e.currentTarget.elements[0].value) {
    ifDublicateSearch()
    return;
  }
  textInput = e.currentTarget.elements[0].value.trim()
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.classList.add("is-hidden");

    if (textInput === '') {
        ifEmptySearchAlert();
        return;
    }
  
  fetchImages(textInput, page).then(({ data }) => {

    if (!data.totalHits) {
      ifNoImagesFoundAlert()
    } else {
      refs.gallery.insertAdjacentHTML('beforeend', renderGallery(data.hits))
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      ifImagesFoundAlert(data);
    }
    if (data.totalHits > 40) {
        refs.loadMoreBtn.classList.remove('is-hidden');
    }
  })
    form.reset();
}

function LoadMoreClick() {
  simpleLightBox.destroy()
  page += 1;

    fetchImages(textInput, page).then(({ data }) => {
    
    refs.gallery.insertAdjacentHTML('beforeend',renderGallery(data.hits))
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        
    const totalPages = Math.ceil(data.totalHits / 40);

      if (page > totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden');
        ifEndOfSearchAlert();
      }
    })
}

refs.loadMoreBtn.addEventListener('click', LoadMoreClick)
refs.form.addEventListener('submit', Submit)