const BASE_URL = 'https://thinkful-list-api.herokuapp.com/andrew';

//function that fetches all items

function getBookmarks() {
  console.log('getbookmarks api call ran');
  return fetch(`${BASE_URL}/bookmarks`);
}

//function that calls the api to add a new element

function createBookmark(bookmark) {
  console.log('create bookmark api call ran');
  let newData = JSON.stringify(bookmark);
  console.log(newData)
  return fetch(`${BASE_URL}/bookmarks`, {
    "method": "POST",
    "headers": { 'Content-Type': 'application/json' },
    "body": newData
  });
}

//fn to delete element

function deleteBookmark(id) {
  console.log('delete bookmark api call ran');
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
  });
}

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
