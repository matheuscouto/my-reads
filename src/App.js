import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    booksOnDisplay: []
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

  componentWillMount(){
    this.getShelfs()
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" render={() => (<ListBooks booksOnDisplay={this.state.booksOnDisplay} updateShelf={this.updateShelf}/>)} />
          <Route path="/search" component={SearchBooks} />        
      </div>
    )
  }
}

export default BooksApp
