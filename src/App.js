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

  checkBookOnDisplay = (book) => {
    const isBookOnDisplay = this.state.booksOnDisplay.filter(
        (bookOnDisplay) => (
          bookOnDisplay.id === book.id
        ))
    return (isBookOnDisplay.length) ? (isBookOnDisplay[0].shelf) : ('none')
  }

  clearSearch = () => {
    this.setState({
      queryTerm: '',
      queryResult: []
    })
  }

  getShelfs = () => {
    BooksAPI.getAll().then((books) => (
      this.setState({
        booksOnDisplay: books
      })
    ))
  }

  updateShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then(
      this.getShelfs()
    )
  }

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
