import React from 'react'

class Book extends React.Component{

    onChangeHandler = (e) => {
        this.props.updateShelf(this.props.bookInfo,e.target.value)
    }

    render(){
        const title = this.props.bookInfo.title
        const author = this.props.bookInfo.author
        const coverUrl = this.props.bookInfo.imageLinks.thumbnail
        return(
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.onChangeHandler} value={this.props.bookInfo.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>
        )
    }
}

export default Book