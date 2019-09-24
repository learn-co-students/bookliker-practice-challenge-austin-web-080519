const booksUrl = 'http://localhost:3000/books';
const listPanel = document.getElementById("list-panel");
const list = document.getElementById("list");
const showPanel = document.getElementById("show-panel");

function fetchBooks() {
    fetch(booksUrl)
    .then(response => response.json())
    .then(booksData => {
        for (const book of booksData) {
            listBookItem(book);
        }
    })
}

function likeBook(book) {
    let me = {"id":1, "username":"pouros"};
    let bookUsers = book['users'];
    bookUsers.push(me);

    let data = {
        users: bookUsers
    }

    let objConfig = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(`${booksUrl}/${book['id']}`, objConfig)
    .then(response => response.json())
    .then(bookData => {
        console.log(bookData);
        displayBook(bookData);
    })
}

function listBookItem(book) {
    const li = document.createElement("li");
    li.id = book['title'];
    li.innerText = book['title'];

    // Add an event listener to each book listed that displays information
    li.addEventListener("click", event => {
        displayBook(book);
    })

    list.appendChild(li);
}

function displayBook(book) {

    while (showPanel.hasChildNodes()) {
        showPanel.removeChild(showPanel.firstChild);
    }

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = book['title'];
    showPanel.appendChild(bookTitle);

    const bookImage = document.createElement("img");
    bookImage.setAttribute("src", `${book['img_url']}`);
    bookImage.setAttribute("height", "100");
    bookImage.setAttribute("width", "100");
    showPanel.appendChild(bookImage);

    const bookDesc = document.createElement("p");
    bookDesc.innerHTML = book['description'];
    showPanel.appendChild(bookDesc);

    const userLikes = document.createElement("ul");
    let users = book.users
    for (const user of users) {
        const userItem = document.createElement("li");
        userItem.innerText = user['username'];
        userLikes.appendChild(userItem);
    }
    showPanel.appendChild(userLikes);

    const likeButton = document.createElement("button");
    likeButton.innerText = "Like";
    createEventForBtn(likeButton, book);
    showPanel.appendChild(likeButton);

}

function createEventForBtn(button, book) {
    button.addEventListener("click", event => {
        event.preventDefault();
        likeBook(book);
    })
}


document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});
