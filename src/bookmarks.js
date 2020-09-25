import $ from "jquery";
import cuid from "cuid";

import api from "./api";
import store from "./store";

const generateBookmarkElement = function (bookmark) {
  console.log("generate bookmark element ran");
  return `<li class= "bookmark-element" data-item-id="${bookmark.id}"> 
  <div class='top-row'><span class="link-title"> ${bookmark.title}</span>
  
  <span class="rating"> Rating: ${bookmark.rating}</span></div>
  <div class="bottom-row hidden">
  <div id='url'class='hidden'> <a class='link-button' href="${bookmark.url}" target='_blank'> Go there!</a></div>
  <p> Description: </p>
  <p>${bookmark.description}</p> 
  <button class= "delete"> Delete </button></div></li>`;
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
  let bookmarks = [...store.bookmarks];

  const bookmarksStr = generateBookmarksString(bookmarks);
  $(".js-display-bookmarks").html(bookmarksStr);
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
  <button  class="cancel-button">Cancel</button>
</form>`;
};

const handleAddButton = function () {
  $(".header").on("click", ".add", function (evt) {
    console.log("add button clicked");
    $(".add-bookmarks-form").toggleClass("hidden");
  });
};

const handleNewBookmarkSubmit = function () {
  $("body").on("click", ".add-bookmark-button", function (event) {
    console.log("handel new bookmark submit ran, add was clicked");
    event.preventDefault();
    const newBookmarkTitle = $("#item-name").val();
    const newBookmarkUrl = $("#url").val();
    const newBookmarkDescription = $("#description").val();
    const newBookmarkRating = $("#rating").val();
    const newBookmark = {
      id: cuid(),
      title: newBookmarkTitle,
      url: newBookmarkUrl,
      rating: newBookmarkRating,
      description: newBookmarkDescription,
      expanded: false,
    };
    store.addBookmark(newBookmark);
    console.log("current bkmks: ", store.bookmarks);
    console.log("first bmk id is: ", store.bookmarks[0]["id"]);
    render();

    /*api
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
      });*/
  });
};

const handleCancelSubmit = function () {
  $("body").on("click", ".cancel", function (event) {
    console.log("cancel clicked");
    event.preventDefault();
    console.log("cancel button clicked");
    $(".add-bookmarks-form").toggleClass("hidden");
  });
};

const getBookmarkIdFromElement = function (bookmark) {
  let id = $(bookmark).closest(".bookmark-element").data("item-id");
  console.log("id of clicked is: ", id);
  return store.findById(id);
};

const handleDeleteBookmark = function () {
  $(".js-display-bookmarks").on("click", ".delete", (evt) => {
    console.log("bookmks before del: ", store.bookmarks);
    const theId = getBookmarkIdFromElement(evt.currentTarget);
    let toDel = store.bookmarks.indexOf(theId);
    console.log("index to del", toDel);
    store.bookmarks.splice(toDel, 1);
    console.log("bookmarks after del: ", store.bookmarks);
    render();
    /*api.deleteBookmark(id).then(() => {
      store.findAndDelete(id);
      render();
    });*/
  });
};

const handleBookMarkExpand = function () {
  $(".js-display-bookmarks").on("click", "li", function (evt) {
    console.log("handle expand ran");
    $(this).children(".bottom-row").toggleClass("hidden");
    $(this).children().children('#url').toggleClass("hidden");
  });
};

const handleFilter = function () {
  $("#rating-filter").on("change", function (event) {
    console.log("filter ran");
    let value = this.value;
    console.log("filter set to ", value);
    store.filter = value;
    store.bookmarks.forEach((bookmark) => {
      if (bookmark.rating < value) {
        $(`[data-item-id="${bookmark.id}"]`).addClass("hidden");
      } else {
        $(`[data-item-id="${bookmark.id}"]`).removeClass("hidden");
      }
    });
  });
};

const bindEventListeners = function () {
  handleNewBookmarkSubmit(),
    handleBookMarkExpand(),
    handleDeleteBookmark();
  handleAddButton();
  handleFilter();
};

export default {
  render,
  bindEventListeners,
};
