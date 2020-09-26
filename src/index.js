/* eslint-disable quotes */

import "normalize.css";
import "./index.css";
import $ from "jquery";

import api from "./api";
import store from "./store";
import bookmarks from "./bookmarks";

const main = function () {
  $('.loading').removeClass('hidden')
  api
    .getBookmarks()
    .then((res) => {
      //console.log("getbookmarks api call ran from main");
      console.log("response: ", res);
      return res.json();
    })
    //.then((data) => console.log("this is the data", data));
    .then((x) => {
      console.log("current bookmarks: ", x);
      x.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarks.render();
    })
    .catch((error) => {
      console.log(error);
      alert("something went wrong, try again later");
    });

  bookmarks.bindEventListeners();
  //bookmarks.render();
  console.log("bookmarks: ", store.bookmarks);
};

$(main);
