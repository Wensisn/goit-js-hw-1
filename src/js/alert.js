import Notiflix from 'notiflix';

function ifEmptySearchAlert() {
  Notiflix.Notify.failure('The search string is empty. Please insert your search query.');
}
function ifNoImagesFoundAlert() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
function ifEndOfSearchAlert() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}
function ifImagesFoundAlert() {
  Notiflix.Notify.success(`Hooray! We found 40 images.`);
}
function ifSomeProblemAlert(error) {
  Notiflix.Notify.failure(`${error.message}Something going wrong ¯\_(ツ)_/¯`);
}
function ifDublicateSearch() {
  Notiflix.Notify.warning("You already search it");
}

export { ifEmptySearchAlert, ifNoImagesFoundAlert, ifEndOfSearchAlert, ifImagesFoundAlert, ifSomeProblemAlert, ifDublicateSearch };
