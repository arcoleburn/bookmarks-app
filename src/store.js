

const bookmarks = [
  /* {
    id: cuid(),
    title: "this is a hard coded example locally",
    url: "https://www.theurlgoeshere.duh",
    description: "description here. blah blah blah ",
    rating: 0,
    expanded: false,
  },*/
];

const adding = false;
const error = null;
const filter = 0;

const setError = function (error) {
  this.error = error;
};
const findById = function (id) {
  return this.bookmarks.find((currentItem) => currentItem.id === id);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

function findAndUpdate(id, newData) {
  let bookmark = this.findById(id);
  Object.assign(bookmark, newData);
}

const findAndDelete = function (id) {
  console.log("current bookmarks before fnd: ", this.bookmarks)
  console.log("item del from local store:", id)
  this.bookmarks = bookmarks.filter(
    (currentItem) => currentItem.id !== id
  );
  console.log("current bkmks after fnd: ", this.bookmarks)
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  findAndDelete,
  findAndUpdate,
  setError,
};
