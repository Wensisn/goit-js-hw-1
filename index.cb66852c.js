const e={searchForm:document.querySelector(".js-search-form"),articlesContainer:document.querySelector(".js-articlas-container")},t=new class{getrefs(e){const t={};return t.button=document.querySelector(e),t.label=t.button.querySelector(".label"),t.spinner=t.button.querySelector(".spinner"),t}enable(){this.refs.button.disabled=!1,this.refs.label.textContent="Показать ещё",this.refs.spinner.classList.add("is-hidden")}disabled(){this.refs.button.disabled=!0,this.refs.label.textContent="Загружаем...",this.refs.spinner.classList.remove("is-hidden")}show(){this.refs.button.classList.remove("is-hidden")}hide(){this.refs.button.classList.add("is-hidden")}constructor({selector:e,hidden:t=!1}){this.refs=this.getrefs(e),t&&this.hide()}}({selector:'[data-action="load-more"]',hidden:!0}),s=new class{fetchArticles(){const e=`https://pixabay.com/api/?key=29490532-fde9d4c0daff56b8071258c00&q=${this.searchQuery}&image_type=photo&per_page=8&page=${this.page}`;return fetch(e).then((e=>e.json())).then((e=>(console.log(e),this.incrementPage(),e.hits)))}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){return this.searchQuery=e}constructor(){this.searchQuery="",this.page=1}};function n(){t.disabled(),t.enable()}function r(t){const s=t.map((({webformatURL:e,largeImageURL:t,tags:s,likes:n,views:r,comments:i,downloads:a})=>`\n    <a class="gallery-link" href="${t}">\n          <div class="photo-card">\n            <img class="photo-card-image" src="${e}" alt="${s}" loading="lazy" />\n            <div class="info">\n              <p class="info-item"><b>Likes:</b>${n}</p>\n              <p class="info-item"><b>Views</b>${r}</p>\n              <p class="info-item"><b>Comments</b>${i}</p>\n              <p class="info-item"><b>Downloads</b>${a}</p>\n            </div>\n          </div>\n        </a>`)).join("");e.articlesContainer.insertAdjacentHTML("beforeend",s)}function i(){e.articlesContainer.innerHTML=""}e.searchForm.addEventListener("submit",(function(e){if(e.preventDefault(),i(),s.query=e.currentTarget.elements.query.value,""===s.query.length)return alert("Erorr");t.show(),s.resetPage(),s.fetchArticles().then(r),i(),n()})),t.refs.button.addEventListener("click",(function(){s.fetchArticles().then(r),n()}));
//# sourceMappingURL=index.cb66852c.js.map
