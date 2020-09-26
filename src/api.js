/* eslint-disable quotes */
const BASE_URL =
  "https://thinkful-list-api.herokuapp.com/andrew/bookmarks";

//function that fetches all items

function getBookmarks() {
  console.log("getbookmarks api call ran from api");
  return fetch(`${BASE_URL}`);
}

//function that calls the api to add a new element

function createBookmark(bookmark) {
  console.log("create bookmark api call ran");
  let newData = JSON.stringify(bookmark);
  console.log("data to pass to api ", newData);
  return fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: newData,
  });
}

//fn to delete element

function deleteBookmark(id) {
  console.log("delete bookmark api call ran from api");
  console.log("id being tacked on is", id);
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
