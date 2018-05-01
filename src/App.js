import React from 'react'
import { Route } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners';
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import SnackBar from './SnackBar'

class BooksApp extends React.Component {
  state = {
    initial: true,
    loading: false,
    snackBarOpen: false,
    undo: true,
    booksOnDisplay: [],
    queryTerm: '',
    queryResult: [],
    lastUpdate: {
      book: {},
      prevShelf: '',
      currentShelf: '',
    },
  }

  // Open / Close Snack Bar
  handleSnackOpen = () => {
    this.setState({ snackBarOpen: true });
  };
  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  // Show / Hide Loading Spinner
  showSpinner = () => {
    this.setState({
      loading:true
    })
  }
  hideSpinner = () => {
    this.setState({
      loading:false
    })
  }

  // Store last update
  storeLastUpdate(book,shelf){
    this.setState({
      lastUpdate:{
        book,
        prevShelf: this.checkBookOnDisplay(book),
        currentShelf: shelf
      }
    })
  }

  // Undo last change
  undoUpdate = () => {
    this.updateShelf(this.state.lastUpdate.book,this.state.lastUpdate.prevShelf,true)
    this.handleSnackClose()
  }

  // Updates the current state with a collection of books that are on any shelf
  getShelfs = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        booksOnDisplay: books
      })

      this.hideSpinner()
      !this.state.initial && !this.state.undo ? this.handleSnackOpen() : this.setState({initial:false, undo:false})
    })
  }

  

  // Uses BooksAPI to update a given shelf with a given book
  updateShelf = (book,shelf,undo=false) => {
    this.showSpinner()
    !undo ? this.storeLastUpdate(book,shelf) : (this.setState({undo:true}))
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
    this.showSpinner()
    this.setState({
      queryTerm: query
    })
    BooksAPI.search(query).then((books) => {
      this.setState({
        queryResult: (books.error) ? [] : books
      })
      this.hideSpinner()
    })
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
    this.showSpinner()
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
          {(
            !this.state.loading) || (
              <div className='sweet-overlay'>
                <PacmanLoader color={'#E0D00D'} />
              </div>      
          )}

          <SnackBar 
            open={this.state.snackBarOpen} 
            handleClose={this.handleSnackClose}
            undoUpdate={this.undoUpdate}
            lastUpdate={this.state.lastUpdate}
          />
      </div>
    )
  }
}

export default BooksApp
