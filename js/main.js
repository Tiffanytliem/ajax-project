const $dateForm = document.querySelector('form');
const $mainPage = document.querySelector('.main-page');
const $favePage = document.querySelector('.fave-page');
const $header = document.querySelector('h1');
const $starIcon = document.querySelector('.fa-star');
const $modalFave = document.querySelector('.modal-favorites');
const $rowFooter = document.querySelector('.row-footer');
const $modalDate = document.querySelector('.form-date');
const $modalNotes = document.querySelector('.modal-notes');
const $footerNotes = document.querySelector('.footer-notes');

function ajaxRequest() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=6PtagfFhUrtJhGiexIbwapgwVFbcE8MGlKW0QG6L');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
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
    checkFavorite();
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
    checkFavorite();
    $modalDate.className = 'form-date hidden';

  });
  xhr.send();
}
function pageSwap(page) {
  viewModal('none');
  const $modalNotesFave = document.querySelector('.modal-notes-fave');
  $modalNotesFave.className = 'modal-notes-fave hidden';

  if (page === 'favorites') {
    $favePage.className = 'container fave-page';
    $mainPage.className = 'container main-page hidden';
    favePageQuery();

  } else if (page === 'main') {
    window.location.reload();
    checkFavorite();
  }
}
function starIconFave(boolean) {
  if (boolean === true) {
    $starIcon.className = 'fa-solid fa-star';
  } else {
    $starIcon.className = 'fa-regular fa-star';
  }
}
function footerNotesFave(boolean) {
  if (boolean === true) {
    $footerNotes.className = 'footer-notes';
  } else {
    $footerNotes.className = 'footer-notes hidden';
  }
}
function renderFavorite(favorite) {
  const $newFavorite = document.createElement('div');
  $newFavorite.setAttribute('id', favorite.faveID);
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
  $notes.className = 'favorite-notes';
  $notes.textContent = 'NOTES';
  $div10.appendChild($notes);
  $div9.appendChild($div10);

  const $div11 = document.createElement('div');
  $div11.className = 'column-auto fave-delete';
  const $delete = document.createElement('p');
  $delete.textContent = 'Remove';
  $div11.appendChild($delete);

  $div9.appendChild($div11);
  $div5.appendChild($div9);
  $div3.appendChild($div5);

  const $div12 = document.createElement('div');
  $div12.className = 'modal-notes-fave hidden';
  const $i = document.createElement('i');
  $i.className = 'fa-solid fa-xmark';
  $div12.appendChild($i);

  const $form = document.createElement('form');
  $form.className = 'form-notes-fave';
  $form.setAttribute('id', favorite.faveID);
  $div12.appendChild($form);
  const $notesHeading = document.createElement('p');
  $notesHeading.textContent = 'NOTES:';
  $form.appendChild($notesHeading);
  const $div13 = document.createElement('div');
  $div13.className = 'notes-container';

  const $textArea = document.createElement('textarea');
  $textArea.setAttribute('id', 'notescontentfave');
  $textArea.setAttribute('rows', '10');
  $textArea.setAttribute('cols', '30');
  $textArea.setAttribute('placeholder', 'Add notes here...');
  $div13.appendChild($textArea);
  $form.appendChild($div13);

  const $input = document.createElement('input');
  $input.setAttribute('type', 'submit');
  $input.className = 'notes-save';
  $input.setAttribute('value', 'SAVE');
  $form.appendChild($input);
  $div12.appendChild($form);

  $newFavorite.appendChild($div3);
  $newFavorite.appendChild($div12);
  return $newFavorite;
}
function viewFavorite(favorite) {
  const $dateDiv = document.createElement('div');
  $dateDiv.className = 'date';
  $dateDiv.textContent = favorite.date;
  const $columnDate = document.querySelector('.column-date');
  $columnDate.removeChild($columnDate.lastChild);
  $columnDate.appendChild($dateDiv);

  const $anchor = document.createElement('a');
  $anchor.setAttribute('href', favorite.pictureUrl);
  const $image = document.createElement('img');
  $image.setAttribute('src', favorite.pictureUrl);
  $image.className = 'picture';
  $anchor.appendChild($image);
  const $columnPhoto = document.querySelector('.column-photo');
  $columnPhoto.removeChild($columnPhoto.lastChild);
  $columnPhoto.appendChild($anchor);

  const $title = document.createElement('h3');
  $title.setAttribute('class', 'title');
  $title.textContent = favorite.title;
  const $titleDiv = document.querySelector('.column-full.tle');
  $titleDiv.removeChild($titleDiv.lastChild);
  $titleDiv.appendChild($title);

  const $credit = document.createElement('p');
  $credit.className = 'credit';
  $credit.textContent = favorite.credit;
  const $credDiv = document.querySelector('.column-full.cred');
  $credDiv.removeChild($credDiv.lastChild);
  $credDiv.appendChild($credit);

  const $explanation = document.createElement('p');
  $explanation.className = 'explanation';
  $explanation.textContent = favorite.explanation;
  const $explDiv = document.querySelector('.column-full.expl');
  $explDiv.removeChild($explDiv.lastChild);
  $explDiv.appendChild($explanation);
}

$modalNotes.addEventListener('click', function (e) {
  if (e.target.matches('.fa-xmark')) {
    viewModal('none');
  }
});

$modalDate.addEventListener('click', function (e) {
  if (e.target.matches('.fa-xmark')) {
    viewModal('none');
  }
});

function checkFavorite() {
  const $date = document.querySelector('.date');
  for (let i = 0; i < data.favorites.length; i++) {
    if ($date.textContent === data.favorites[i].date) {
      starIconFave(true);
      footerNotesFave(true);
      return true;
    } else {
      starIconFave(false);
      footerNotesFave(false);
    }
  } return false;
}
function viewModal(modal) {
  if (modal === 'search') {
    $modalDate.className = 'form-date';
    $modalFave.className = 'modal-favorites hidden';
    $modalNotes.className = 'modal-notes hidden';
  } else if (modal === 'favorites') {
    $modalDate.className = 'form-date hidden';
    $modalFave.className = 'modal-favorites';
    $modalNotes.className = 'modal-notes hidden';
  } else if (modal === 'notes') {
    $modalDate.className = 'form-date hidden';
    $modalFave.className = 'modal-favorites hidden';
    $modalNotes.className = 'modal-notes';
  } else if (modal === 'none') {
    $modalDate.className = 'form-date hidden';
    $modalFave.className = 'modal-favorites hidden';
    $modalNotes.className = 'modal-notes hidden';
  }
}

$dateForm.addEventListener('submit', ajaxRequestDate);
$header.addEventListener('click', function (e) {
  pageSwap('main');
}
);
$rowFooter.addEventListener('click', function (event) {
  if (event.target.matches('.search')) {
    viewModal('search');
  } else if (event.target.matches('.notes')) {
    viewModal('notes');
  }
});
$mainPage.addEventListener('click', function (event) {
  if (event.target.matches('.fa-regular.fa-star') && checkFavorite() !== true) {
    const $date = document.querySelector('.date');
    const $picture = document.querySelector('.picture');
    const $title = document.querySelector('.title');
    const $credit = document.querySelector('.credit');
    const $explanation = document.querySelector('.explanation');

    const favorite = {
      date: $date.textContent,
      pictureUrl: $picture.src,
      title: $title.textContent,
      credit: $credit.textContent,
      explanation: $explanation.textContent
    };
    favorite.notes = '';
    favorite.faveID = data.nextFaveID;
    data.nextFaveID++;

    starIconFave(true);
    footerNotesFave(true);
    viewModal('favorites');

    data.favorites.unshift(favorite);
    const $favoriteList = document.querySelector('.favorite-list');
    $favoriteList.prepend(renderFavorite(favorite));

  } else if (event.target.matches('.favorites')) {
    pageSwap('favorites');
  } else if (event.target.matches('.notes') && checkFavorite() === true) {
    viewModal('notes');
    const $date = document.querySelector('.date');
    // console.log($date.textContent);
    const $textArea = document.querySelector('#notescontent');

    // console.log($textArea);
    for (let i = 0; i < data.favorites.length; i++) {
      if ($date.textContent === data.favorites[i].date) {
        // console.log($date.textContent);
        $textArea.textContent = data.favorites[i].notes;
        // console.log(data.favorites[i].notes);
        // console.log($textArea.textContent);
      }
    }
  }
});

$modalFave.addEventListener('click', function (e) {
  if (e.target.matches('.fa-xmark')) {
    viewModal('none');
  } else if (e.target.matches('.view-list')) {
    viewModal('none');
    pageSwap('favorites');
  } else if (e.target.matches('.add-note')) {
    viewModal('notes');
    const $textArea = document.querySelector('#notescontent');
    $textArea.textContent = '';
  }
});

const $notesForm = document.querySelector('.form-notes');
$notesForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $date = document.querySelector('.date');
  for (let i = 0; i < data.favorites.length; i++) {
    if ($date.textContent === data.favorites[i].date) {
      data.favorites[i].notes = $notesForm.elements.notescontent.value;
    }
  }
  viewModal('none');
  $notesForm.reset();
});

document.addEventListener('DOMContentLoaded', function () {
  const $favoriteList = document.querySelector('.favorite-list');
  for (let i = 0; i < data.favorites.length; i++) {
    $favoriteList.appendChild(renderFavorite(data.favorites[i]));
  }
});

function favePageQuery() {
  const $allFavorites = document.querySelectorAll('.new-favorite');
  const $fave = document.querySelector('.new-favorite');
  $fave.addEventListener('click', function () {
    // console.log($fave);
  });
  // const $notesForm = document.querySelector('.form-notes-fave');
  const $modalNotesFave = document.querySelector('.modal-notes-fave');
  $modalNotesFave.addEventListener('click', function (e) {
    if (e.target.matches('.fa-xmark')) {
      viewModal('none');
      $modalNotesFave.className = 'modal-notes-fave hidden';
    }
  });
  const $formNotesFaves = document.querySelectorAll('.form-notes-fave');
  // const $formNotesFave = document.querySelector('.form-notes-fave');
  // console.log($formNotesFaves);
  // console.log($formNotesFave);
  for (let i = 0; i < $formNotesFaves.length; i++) {
    const item = $formNotesFaves[i];
    item.addEventListener('click', function () {
      // console.log(item);
    });
    item.addEventListener('submit', function (e) {
      e.preventDefault();
      // console.log(item);
      for (let j = 0; j < data.favorites.length; j++) {
        if (Number(item.getAttribute('id')) === data.favorites[j].faveID) {
          // console.log(item.getAttribute('id'));
          // console.log(data.favorites[j].faveID);
          data.favorites[j].notes = item.elements.notescontentfave.value;
          viewModal('none');
          item.reset();
          $modalNotesFave.className = 'modal-notes-fave hidden';
        }
      }
    });
  }

  // $notesForm.addEventListener('submit', function (event) {
  //   event.preventDefault();
  //   const $favorite = document.querySelector('.new-favorite');
  //   // for (let i = 0; i < $allFavorites.length; i++) {
  //   // const $each = $allFavorites[i];
  //   // console.log($each);
  //   for (let j = 0; j < data.favorites.length; j++) {
  //     if (Number($favorite.getAttribute('id')) === data.favorites[j].faveID) {
  //       console.log($favorite);
  //       // console.log('hey!');
  //       data.favorites[j].notes = $notesForm.elements.notescontentfave.value;
  //       // console.log($notesForm.elements.notescontentfave.value);
  //       // console.log(data.favorites[j].notes);
  //       viewModal('none');
  //       $notesForm.reset();
  //       $modalNotesFave.className = 'modal-notes-fave hidden';
  //     }
  //   }
  // }
  //   // }
  // );
  for (let i = 0; i < $allFavorites.length; i++) {
    const $each = $allFavorites[i];
    // console.log($each);

    // $each.addEventListener('submit', function (e) {
    //   event.preventDefault();
    //   const $notesForm = document.querySelector('.form-notes-fave');
    //   console.log($each);
    //   for (let j = 0; j < data.favorites.length; j++) {
    //     if (Number($each.getAttribute('id')) === data.favorites[j].faveID) {
    //       console.log($each);
    //       data.favorites[j].notes = $notesForm.elements.notescontentfave.value;
    //       console.log($notesForm.elements.notescontentfave.value);
    //       console.log(data.favorites[j].notes);
    //       viewModal('none');
    //       $notesForm.reset();
    //       $modalNotesFave.className = 'modal-notes-fave hidden';
    //     }
    //   }
    // });

    $each.addEventListener('click', function (e) {
      // console.log($each);
      if (e.target.matches('.favorite-notes')) {
        $modalNotesFave.className = 'modal-notes-fave';
        const $textArea = document.querySelector('#notescontentfave');
        for (let j = 0; j < data.favorites.length; j++) {
          if (Number($each.getAttribute('id')) === data.favorites[j].faveID) {
            const $formNotesFave = document.querySelector('.form-notes-fave');
            $formNotesFave.setAttribute('id', data.favorites[j].faveID);
            // console.log($formNotesFave);
            $textArea.textContent = data.favorites[j].notes;

          }
        }

      } else if (e.target.matches('.favorite-title')) {
        for (let j = 0; j < data.favorites.length; j++) {
          if (Number($each.getAttribute('id')) === data.favorites[j].faveID) {
            $favePage.className = 'container fave-page hidden';
            $mainPage.className = 'container main-page';
            viewFavorite(data.favorites[j]);
            checkFavorite();
          }
        }
      }
    });
  }
}
