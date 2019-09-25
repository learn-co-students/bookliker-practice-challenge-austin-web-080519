document.addEventListener("DOMContentLoaded", function() {
    const booksURL = `http://localhost:3000/books`
    // const singleBookURL = `http://localhost:3000/books/${book.id}`
    const showBookPanel = document.getElementById('show-panel')
    const listBooks = document.getElementById('list')
    const listPanel = document.getElementById('list-panel')
    

    fetch(booksURL)
    .then (function(response) {
        return response.json()
    })
    .then (function(data){
    
        data.forEach(function(book) {
            showBooks(book)
        }
        )
    });

    function showBooks(book) {
        const singleBookURL = `http://localhost:3000/books/${book.id}`
        const para = document.createElement('p')
        const li = document.createElement('li')
        
        const bookName = document.createTextNode(`${book.title}`)
        listBooks.appendChild(li)
        h1.appendChild(bookName)
        
        listBooks.appendChild(para)
        listPanel.appendChild(listBooks)
        // a.appendChild(bookName)
    
        h1.addEventListener("click", (event) => {
            event.preventDefault()

            const bookDesc = document.createTextNode(`${book.description}`)
            showBookPanel.appendChild(bookDesc)
            const image = document.createElement('img')
            image.setAttribute = ('src', `${book.img_url}`)
            showBookPanel.appendChild(image)
            // fetch(singleBookURL) 
            // .then (response => console.log(response))
            
        })
    }

    });

    // current bugs
    // line 