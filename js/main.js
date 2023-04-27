const $dateForm = document.querySelector('form');
function ajaxRequest() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=6PtagfFhUrtJhGiexIbwapgwVFbcE8MGlKW0QG6L');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    const xhrResponse = xhr.response;
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date';
    $dateDiv.textContent = xhrResponse.date;
    const $columnDate = document.querySelector('.column-date');
    $columnDate.appendChild($dateDiv);

    const $anchor = document.createElement('a');
    $anchor.setAttribute('href', xhrResponse.hdurl);
    const $image = document.createElement('img');
    $image.setAttribute('src', xhrResponse.hdurl);
    $image.className = 'picture';
    $anchor.appendChild($image);
    const $columnPhoto = document.querySelector('.column-photo');
    $columnPhoto.appendChild($anchor);

    const $title = document.createElement('h3');
    $title.setAttribute('class', 'title');
    $title.textContent = xhrResponse.title;
    const $titleDiv = document.querySelector('.column-full.tle');
    $titleDiv.appendChild($title);

    const $credit = document.createElement('p');
    $credit.className = 'credit';
    $credit.textContent = 'Image Credit & Copyright: ' + xhrResponse.copyright;
    const $credDiv = document.querySelector('.column-full.cred');
    $credDiv.appendChild($credit);

    const $explanation = document.createElement('p');
    $explanation.className = 'explanation';
    $explanation.textContent = 'Explanation: ' + xhrResponse.explanation;
    const $explDiv = document.querySelector('.column-full.expl');
    $explDiv.appendChild($explanation);

  });
  xhr.send();
}
ajaxRequest();

function ajaxRequestDate(event) {
  event.preventDefault();
  const inputDate = event.target.elements.date.value;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=6PtagfFhUrtJhGiexIbwapgwVFbcE8MGlKW0QG6L&date=' + inputDate);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);
    const xhrResponse = xhr.response;
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date';
    $dateDiv.textContent = xhrResponse.date;
    const $columnDate = document.querySelector('.column-date');
    $columnDate.removeChild($columnDate.lastChild);
    $columnDate.appendChild($dateDiv);

    const $anchor = document.createElement('a');
    $anchor.setAttribute('href', xhrResponse.hdurl);
    const $image = document.createElement('img');
    $image.setAttribute('src', xhrResponse.hdurl);
    $image.className = 'picture';
    $anchor.appendChild($image);
    const $columnPhoto = document.querySelector('.column-photo');
    $columnPhoto.removeChild($columnPhoto.lastChild);
    $columnPhoto.appendChild($anchor);

    const $title = document.createElement('h3');
    $title.setAttribute('class', 'title');
    $title.textContent = xhrResponse.title;
    const $titleDiv = document.querySelector('.column-full.tle');
    $titleDiv.removeChild($titleDiv.lastChild);
    $titleDiv.appendChild($title);

    const $credit = document.createElement('p');
    $credit.className = 'credit';
    $credit.textContent = 'Image Credit & Copyright: ' + xhrResponse.copyright;
    const $credDiv = document.querySelector('.column-full.cred');
    $credDiv.removeChild($credDiv.lastChild);
    $credDiv.appendChild($credit);

    const $explanation = document.createElement('p');
    $explanation.className = 'explanation';
    $explanation.textContent = 'Explanation: ' + xhrResponse.explanation;
    const $explDiv = document.querySelector('.column-full.expl');
    $explDiv.removeChild($explDiv.lastChild);
    $explDiv.appendChild($explanation);
    $formDate.className = 'form-date hidden';
  });
  xhr.send();
}

$dateForm.addEventListener('submit', ajaxRequestDate);

const $mainPage = document.querySelector('.main-page');
const $favePage = document.querySelector('.fave-page');
const $header = document.querySelector('h1');

const $starIcon = document.querySelector('.fa-star');
const $modalFave = document.querySelector('.modal-favorites');
// const $xmark = document.querySelector('.fa-xmark');
const $rowFooter = document.querySelector('.row-footer');
const $formDate = document.querySelector('.form-date');

$header.addEventListener('click', function (e) {
  pageSwap('main');
}
);

$rowFooter.addEventListener('click', function (event) {
  if (event.target.matches('.search')) {
    $formDate.className = 'form-date';
    $modalFave.className = 'modal-favorites hidden';
  }
});

function starIconFave(boolean) {
  if (boolean === true) {
    $starIcon.className = 'fa-solid fa-star';
  } else {
    $starIcon.className = 'fa-regular fa-star';
  }
}

function pageSwap(page) {
  if (page === 'favorites') {
    $favePage.className = 'container fave-page';
    $mainPage.className = 'container main-page hidden';
  } else if (page === 'main') {
    window.location.reload();
  }
}

$mainPage.addEventListener('click', function (event) {
  if (event.target.matches('.fa-regular.fa-star')) {
    // console.log($mainPage);
    const $picture = document.querySelector('.picture');
    const $date = document.querySelector('.date');
    const $title = document.querySelector('.title');
    const $credit = document.querySelector('.credit');
    const $explanation = document.querySelector('.explanation');

    starIconFave(true);
    $modalFave.className = 'modal-favorites';
    const favorite = {
      date: $date.textContent,
      pictureUrl: $picture.src,
      title: $title.textContent,
      credit: $credit.textContent,
      explanation: $explanation.textContent
    };
    favorite.faveID = data.nextFaveID;
    data.nextFaveID++;
    data.favorites.unshift(favorite);
    const $favoriteList = document.querySelector('.favorite-list');
    $favoriteList.prepend(renderFavorite(favorite));
  } else if (event.target.matches('.favorites')) {
    pageSwap('favorites');
  } else {
    starIconFave(false);
  }
});

$modalFave.addEventListener('click', function (e) {
  // console.log(e.target);
  if (e.target.matches('.fa-xmark')) {
    $modalFave.className = 'modal-favorites hidden';
  } else if (e.target.matches('.view-list')) {
    $modalFave.className = 'modal-favorites hidden';
    pageSwap('favorites');
  } else if (e.target.matches('.add-note')) {
    $modalFave.className = 'modal-favorites hidden';
    // $modalNote.className = 'modal-notes';
  }
});
// Add data to FAVORITES page
function renderFavorite(favorite) {
  const $newFavorite = document.createElement('div');
  $newFavorite.className = 'new-favorite';
  const $div1 = document.createElement('div');
  $div1.className = 'row-date';
  const $div2 = document.createElement('div');
  $div2.className = 'column-date';
  const $favDate = document.createElement('p');
  $favDate.className = 'fav-date';
  const $favDateText = document.createTextNode(favorite.date);
  $favDate.appendChild($favDateText);
  $div2.appendChild($favDate);
  $div1.appendChild($div2);
  $newFavorite.appendChild($div1);

  const $div3 = document.createElement('div');
  $div3.className = 'row';
  const $div4 = document.createElement('div');
  $div4.className = 'favorite-column-photo';
  const $image = document.createElement('img');
  $image.className = 'favorite-image';
  $image.setAttribute('src', favorite.pictureUrl);
  $div4.appendChild($image);
  $div3.appendChild($div4);

  const $div5 = document.createElement('div');
  $div5.className = 'favorite-column-info';
  const $div6 = document.createElement('div');
  $div6.className = 'row';
  const $div7 = document.createElement('div');
  $div7.className = 'column-full fave-tle';
  const $title = document.createElement('h3');
  $title.className = 'favorite-title';
  const $titleText = document.createTextNode(favorite.title);
  $title.appendChild($titleText);
  $div7.appendChild($title);
  $div6.appendChild($div7);
  const $div8 = document.createElement('div');
  $div8.className = 'column-full fave-expl';
  const $explanation = document.createElement('p');
  $explanation.className = 'favorite-explanation';
  const $explanationText = document.createTextNode(favorite.explanation);
  $explanation.appendChild($explanationText);
  $div8.appendChild($explanation);
  $div6.appendChild($div8);
  $div5.appendChild($div6);

  const $div9 = document.createElement('div');
  $div9.className = 'row-notes-delete';
  const $div10 = document.createElement('div');
  $div10.className = 'column-auto fave-notes';
  const $notes = document.createElement('p');
  $notes.textContent = 'NOTES';
  $div10.appendChild($notes);
  $div9.appendChild($div10);

  const $div11 = document.createElement('div');
  $div11.className = 'column-auto fave-delete';
  const $delete = document.createElement('p');
  $delete.textContent = 'DELETE';
  $div11.appendChild($delete);
  $div9.appendChild($div11);

  $div5.appendChild($div9);
  $div3.appendChild($div5);

  $newFavorite.appendChild($div3);

  return $newFavorite;
}

document.addEventListener('DOMContentLoaded', function () {
  const $favoriteList = document.querySelector('.favorite-list');
  for (let i = 0; i < data.favorites.length; i++) {
    $favoriteList.appendChild(renderFavorite(data.favorites[i]));
  }
});
