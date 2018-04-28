import React from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'
import _ from 'lodash'





class ListBooks extends React.Component {

    getBooksByShelf(){
        return _.groupBy(this.props.booksOnDisplay,'shelf')
    }

    componentWillReceiveProps(props){
        console.log('ListBooks Receive props:',props)
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
                        _.map(this.getBooksByShelf(),(bookshelf,bookshelfTitle) => (
                            <Bookshelf key={bookshelfTitle} bookshelfTitle={bookshelfTitle} bookshelfCollection={bookshelf} updateShelf={this.props.updateShelf}/>
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