//add event listener to the button
document.querySelector('button').addEventListener('click', getTitle)
//on page load grab whatever is in local storage under the key of books and plug in to the dom
document.querySelector('h2').innerText = localStorage.getItem('books')

function getTitle(){
    //store the user input(book isbn) in a variable
    const bookIsbn = document.querySelector('input').value
    console.log(bookIsbn);
    //pluggin the variable into the open library url
    const url = `https://openlibrary.org/isbn/${bookIsbn}.json`
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data.title);
          //the if statement ensures that for the first time the code runs the local storage has the title plugged in instead of null
          if(!localStorage.getItem('books')){
            localStorage.setItem('books', data.title)
          }else{//the else statement ensures that for every other time the code runs the title is kind of like appended or concatenated to the previous title
             let books = localStorage.getItem('books') + " ; " + data.title
            localStorage.setItem('books', books)
          }
          //here we grab whatever thats on the local storage and pluggin to the dom
          document.querySelector('h2').innerText = localStorage.getItem('books')
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }