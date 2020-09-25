import cuid from 'cuid'

const bookmarks = [{
    id: cuid(),
      title: "this is a hard coded example",
      url: "https://www.theurlgoeshere.duh",
      description: "description here. blah blah blah ",
      rating: 0,
      expanded: false
  }]

  const adding = false
  const error = null
  const filter =  0


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
  store.items = store.items.filter(
    (currentItem) => currentItem.id !== id
  );
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
};
