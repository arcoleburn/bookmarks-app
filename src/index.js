import "./index.css";
import $ from "jquery";

import api from "./api";
import store from "./store";
import bookmarks from "./bookmarks";

const main = function () {
  /*api
    .getBookmarks()
    .then((res) => {
      console.log("getbookmarks api call ran fee fee fee ");
      console.log("response: ", res);
      res.json()
    })
    .then((x) => {
      console.log("items: ", x)
      //items.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarks.render();
    })
    .catch((error) => {
      console.log(error);
      alert("something went wrong, try again later");
    });*/

  bookmarks.bindEventListeners();
  bookmarks.render();
  console.log("bookmarks: ", store.store);
};

$(main);
