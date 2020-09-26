/* eslint-disable quotes */
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
  <p>${bookmark.desc}</p> 
  <button class= "delete"> Delete </button></div></li>`;
};

const generateBookmarksString = function (bookmarks) {
  console.log("generate bookmarks str ran");
  const bookmarksList = bookmarks.map((bookmark) =>
    generateBookmarkElement(bookmark)
  );
  return bookmarksList.join("");
};

const generateError = function (error) {
  $(".err-msg").children("span").html(`${store.error}`);
};

const renderError = function () {
  if (store.error) {
    generateError(store.error);
    $(".err-msg").toggleClass("hidden");
  }
};

const handleCloseError = function () {
  $("body").on("click", ".errbtn", function (evt) {
    evt.preventDefault();
    console.log("handle close err ran");
    store.setError(null);
    console.log("err state is: ", store.error);
    $(".err-msg").toggleClass("hidden");
  });
};
const render = function () {
  $('.loading').addClass('hidden')
  renderError();
  console.log("render ran");
  let bookmarks = [...store.bookmarks];

  const bookmarksStr = generateBookmarksString(bookmarks);
  $(".js-display-bookmarks").html(bookmarksStr);
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
    console.log("new desc: ", newBookmarkDescription)
    const newBookmarkRating = $("#rating").val();
    const newBookmark = {
      title: newBookmarkTitle,
      url: newBookmarkUrl,
      rating: newBookmarkRating,
      desc: newBookmarkDescription
     
    };
    
    console.log("current bkmks: ", store.bookmarks);

    render();
    let isOk;
    api
      .createBookmark(newBookmark)
      .then((res) => {
        isOk = res.ok;
        return res.json();
      })

      .then((jsonData) => {
        if (isOk) {
          store.addBookmark(jsonData);
          render();
        } else {
          throw new Error(jsonData.message);
        }
      })
      .catch((error) => {
        store.setError(error.message);
        console.log("error: ", error);
        render();
        console.log("store err: ", store.error);
      });
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

const getBookmarkFromElement = function (bookmark) {
  let id = $(bookmark).closest(".bookmark-element").data("item-id");
  console.log("id of clicked is: ", id);
  return store.findById(id);
};

const handleDeleteBookmark = function () {
  $(".js-display-bookmarks").on("click", ".delete", (evt) => {
   
    const bookmk = getBookmarkFromElement(evt.currentTarget);
    const theId = bookmk.id;
    let toDel = store.bookmarks.indexOf(bookmk);
    console.log('index ', toDel)
    console.log("id to del", theId);
    
    
    api
      .deleteBookmark(theId)
      .then(() => {
        console.log("bookmarks pre: ", store.bookmarks);
        store.bookmarks.splice(toDel, 1);
        
        console.log("bookmarks post: ", store.bookmarks);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        
      });
  });
};

const handleBookMarkExpand = function () {
  $(".js-display-bookmarks").on("click", "li", function (evt) {
    console.log("handle expand ran");
    $(this).children(".bottom-row").toggleClass("hidden");
    $(this).children().children("#url").toggleClass("hidden");
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
  handleNewBookmarkSubmit();
  handleBookMarkExpand();
  handleDeleteBookmark();
  handleAddButton();
  handleFilter();
  handleCancelSubmit();
  handleCloseError();
};

export default {
  render,
  bindEventListeners,
};
