const $mainPage = document.querySelector('.main-page');
const $favePage = document.querySelector('.fave-page');
const $header = document.querySelector('h1');
const $dateForm = document.querySelector('form');
const $starIcon = document.querySelector('.fa-star');
const $modalFave = document.querySelector('.modal-favorites');
// const $xmark = document.querySelector('.fa-xmark');
const $rowFooter = document.querySelector('.row-footer');
const $formDate = document.querySelector('.form-date');

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
    starIconFave(true);
    $modalFave.className = 'modal-favorites';

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

$header.addEventListener('click', function (e) {
  pageSwap('main');
}
);
