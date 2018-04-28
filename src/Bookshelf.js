import React from 'react'
import Book from './Book'
import _ from 'lodash'

class Bookshelf extends React.Component{

    render(){
        console.log('bookshelf props:',this.props)
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {_.map(this.props.bookshelfCollection,(book) => (
                            <li key={book.title}>
                                <Book bookInfo={book} updateShelf={this.props.updateShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf