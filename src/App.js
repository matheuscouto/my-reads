import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    booksOnDisplay: [],
    queryTerm: '',
    queryResult: []
  }


  // Updates the current state with a collection of books that are on any shelf
  getShelfs = () => {
    BooksAPI.getAll().then((books) => (
      this.setState({
        booksOnDisplay: books
      })
    ))
  }

  // Uses BooksAPI to update a given shelf with a given book
  updateShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() => this.getShelfs())
  }

  // Uses BooksAPI to search for a book with the given query term
  // It updates the queryResult state with a collections of books
  // It also prevents the user to search for an empty term using the function clearSearch
  searchBook = (query) => {
    if (!query){
      this.clearSearch()
      return
    }
    this.setState({
      queryTerm: query
    })
    BooksAPI.search(query).then((books) => (
      this.setState({
        queryResult: (books.error) ? [] : books
      })
    ))
  }

// Clear all query related states
  clearSearch = () => {
    this.setState({
      queryTerm: '',
      queryResult: []
    })
  }

  // Checks whether given book is on any shelf
  // It returns on which shelf it is otherwise a 'none' string
  checkBookOnDisplay = (book) => {
    const isBookOnDisplay = this.state.booksOnDisplay.filter(
        (bookOnDisplay) => (
          bookOnDisplay.id === book.id
        ))
    return (isBookOnDisplay.length) ? (isBookOnDisplay[0].shelf) : ('none')
  }

  componentWillMount(){
    this.getShelfs()
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks 
              booksOnDisplay={this.state.booksOnDisplay} 
              updateShelf={this.updateShelf}
            />)} 
          />
          <Route path="/search" render={() => (
            <SearchBooks 
              queryResult={this.state.queryResult} 
              queryTerm={this.state.queryTerm} 
              searchBook={this.searchBook}  
              updateShelf={this.updateShelf}
              clearSearch={this.clearSearch}
              checkBookOnDisplay={this.checkBookOnDisplay}
            />)} 
          />        
      </div>
    )
  }
}

export default BooksApp
