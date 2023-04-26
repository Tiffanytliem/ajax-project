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
