/* exported data */
let data = {
  view: 'favorites',
  favorites: [],
  nextFaveID: 1
};

window.addEventListener('beforeunload', function () {
  const dataJSON =
  JSON.stringify(data);
  this.localStorage.setItem('data', dataJSON);
});

const previousData = localStorage.getItem('data');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
