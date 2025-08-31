const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkListUl = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

let bookmarkLists = JSON.parse(localStorage.getItem("bookmarkLists")) || [];

addBookmarkBtn.addEventListener("click", submitBookmarkBtn);

function submitBookmarkBtn(e) {
  e.preventDefault();

  const bookmarkName = bookmarkNameInput.value.trim();
  const bookmarkUrl = bookmarkUrlInput.value.trim();

  if (bookmarkName === '' || bookmarkUrl ==='') {
    alert('Name or URL empty');
    return;
  } else if (!bookmarkUrl.startsWith("http://") || !bookmarkUrl.startsWith("https://")) {
    alert("Please enter a valid URL starting with http:// or https://");
    return;
  }

  bookmarkLists.push({
    id: Date.now(),
    name: bookmarkName,
    url: bookmarkUrl,
  });

  localStorage.setItem("bookmarkLists", JSON.stringify(bookmarkLists));

  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";

  updateUI();
}

// UI update
function updateUI() {
  bookmarkListUl.innerHTML = "";

  const sortedBookmarkLists = [...bookmarkLists].reverse();

  sortedBookmarkLists.forEach((bookmark) => {
    const bookmarkEl = createBookmarkElement(bookmark);
    bookmarkListUl.appendChild(bookmarkEl);
  });
}

//  Create new bookmark element
function createBookmarkElement(bookmark) {
  const li = document.createElement("li");
  li.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
        <button onclick="removeBookmark(${bookmark.id})">Remove</button>`;
  return li;
}

// Remove bookmark element
function removeBookmark(id) {
  bookmarkLists = bookmarkLists.filter((b) => b.id !== id);
  localStorage.setItem("bookmarkLists", JSON.stringify(bookmarkLists));
  updateUI();
}

updateUI();
