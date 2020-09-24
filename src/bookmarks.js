import $ from "jquery";

import api from "./api";
import store from "./store";

const generateBookmarkElement = function (bookmark) {
  console.log("generate bookmark element ran");
  return `<li class= "bookmark-element data-item-id="${bookmark.id}"> Title: ${bookmark.title} Rating: ${bookmark.rating}`;
};

const generateBookmarksString = function (bookmarks) {
  console.log("generate bookmarks str ran");
  const bookmarksList = bookmarks.map((bookmark) =>
    generateBookmarkElement(bookmark)
  );
  return bookmarksList.join("");
};

const render = function () {
  console.log("render ran");
  let bookmarks = [...store.store.bookmarks];

  const bookmarksStr = generateBookmarksString(bookmarks);
  $(".js-bookmarks").html(bookmarksStr);
};
const addScreen = function () {
  console.log("add screen ran");
  return `<form class="add-bookmarks-form">
  <label for="item">Title:</label>
  <input type="text" name="item-name" id="item-name" />
  <label for="url">URL: </label>
  <input type="text" name="url" id="url" />
  <label for="description">Description:</label>
  <textarea name="description" id="description"></textarea>
  <button  class="add-bookmark-button">Add Bookmark</button>
  <button type="reset">Cancel</button>
</form>`;
};

const handleAddButton = function () {
  $(".header").on("click", ".add", function (evt) {
    console.log("add button clicked");
    $(".bookmark-list").html(addScreen());
  });
};

const handleNewBookmarkSubmit = function () {
  $("body").on("click", ".add-bookmark-button", function (event) {
    console.log("handel new bookmark submit ran, add was clicked");
    event.preventDefault();
    const newBookmarkTitle = $("#item-name").val();
    const newBookmarkUrl = $("#url").val();
    const newBookmarkDescription = $("#description").val();

    const newBookmark = {
      title: newBookmarkTitle,
      url: newBookmarkUrl,
      description: newBookmarkDescription,
    };

    api
      .createBookmark(newBookmark)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })

      .then((jsonData) => {
        store.addBookmark(jsonData);
        render();
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
};

const getBookmarkIdFromElement = function () {
  return; //here we need to return the id number of the item clicked on
};

const handleDeleteBookmark = function () {
  $(".js-bookmarks").on("click", ".delete", (evt) => {
    const id = getBookmarkIdFromElement(evt.currentTarget);

    api.deleteBookmark(id).then(() => {
      store.findAndDelete(id);
      render();
    });
  });
};

const handleBookMarkExpand = function () {
  $(".js-bookmarks").on("click", "li", (evt) => {
    //expand the bookmark
  });
};

const bindEventListeners = function () {
  handleNewBookmarkSubmit(),
    handleBookMarkExpand(),
    handleDeleteBookmark();
  handleAddButton();
};

export default {
  render,
  bindEventListeners,
};
