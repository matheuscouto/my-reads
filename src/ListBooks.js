import React from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import _ from 'lodash'





class ListBooks extends React.Component {
    state = {
      loading: true,
    }
  
    // Uses lodash groupBy to group the book collection by shelf
    getBooksByShelf(){
        return _.groupBy(this.props.booksOnDisplay,'shelf')
    }

    render(){
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {
                            // Maps over grouped book collection to render each Bookshelf component with its own book items
                            _.map(this.getBooksByShelf(),(bookshelf,bookshelfTitle) => (
                                <Bookshelf 
                                    key={bookshelfTitle} 
                                    bookshelfTitle={bookshelfTitle} 
                                    bookshelfCollection={bookshelf} 
                                    updateShelf={this.props.updateShelf}/>
                            ))
                        }
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks