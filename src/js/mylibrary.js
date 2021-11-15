import LocalService from './localStorage.js';
import ApiServices from './ApiServices.js';
import { load, save, remove, keys } from './localStorage';
import RenderMarkup from './RenderMarkup';

const refs = {
  //   watchedBtn: document.querySelector('#js-watched'),
  //   queueBtn: document.querySelector('#js-queue'),
  filmsList: document.querySelector('.js-films'),
};

// const localService = new LocalService();
const api = new ApiServices();
const renderMarkup = new RenderMarkup();

export const onClickMyLibrary = function () {
  onClickWatched();
}

export const onClickWatched = function () {
  refs.filmsList.innerHTML = '';
  const localData = load('Watched');

  if (!localData || localData.length === 0) {
    console.log('no fils added yet');
    refs.filmsList.innerHTML = '<li class="card__title"><p>Your watched list is empty! Please add some films!</p></li>';
  } else {
    const results = [];
    for (let id of localData) {
      api.movieId = id;
      api.fetchFilmById().then(data => {
        data.genre_ids = data.genres.map(item => item.id);
        results.push(data);
        renderMarkup.renderMarkup(results, { showVotes: true });
      });
    }
  }
};

export const onClickQueue = function () {
  refs.filmsList.innerHTML = '';
  const localData = load('Queue');

  if (!localData || localData.length === 0) {
    console.log('no fils added yet');
    refs.filmsList.innerHTML = '<li class="card__title"><p>Your queue list is empty! Please add some films!</p></li>';
  } else {
    const results = [];
    for (let id of localData) {
      api.movieId = id;
      api.fetchFilmById().then(data => {
        data.genre_ids = data.genres.map(item => item.id);
        results.push(data);
        renderMarkup.renderMarkup(results, { showVotes: true });
      });
    }
  }
};


