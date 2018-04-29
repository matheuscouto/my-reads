import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Book from './Book' 

class SearchBooks extends React.Component{

    onChangeHandler = (e) => {
        this.props.searchBook(e.target.value)
    }

    componentWillReceiveProps(props){
        console.log('SearchBook props:', props )
    }

    componentWillUnmount(){
        this.props.clearSearch()
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author" 
                        value={this.props.queryTerm} 
                        onChange={this.onChangeHandler}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {
                        _.map(this.props.queryResult,(book) => (
                            <li key={book.id}>
                                <Book
                                    key={book.id}
                                    bookInfo={book}
                                    updateShelf={this.props.updateShelf}
                                    checkBookOnDisplay={this.props.checkBookOnDisplay}
                                    />
                            </li>
                        ))
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks