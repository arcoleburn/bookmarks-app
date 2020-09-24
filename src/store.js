const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0,
};

const findById = function (id) {
  return this.bookmarks.find((currentItem) => currentItem.id === id);
};

const addBookmark = function (bookmark) {
  store.bookmarks.push(bookmark);
};

function findAndUpdate(id, newData) {
  let bookmark = this.findById(id);
  Object.assign(bookmark, newData);
}

const findAndDelete = function (id) {
  store.items = store.items.filter(
    (currentItem) => currentItem.id !== id
  );
};

export default {
  store,
  findById,
  addBookmark,
  findAndDelete,
  findAndUpdate,
};
