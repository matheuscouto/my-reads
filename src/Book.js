import React from 'react'

class Book extends React.Component{

    state={
        showDetail: false
    }

    onChangeHandler = (e) => {
        this.props.updateShelf(this.props.bookInfo,e.target.value)
    }

    onShowDetail = () => {
        this.setState({
            showDetail: true
        })
    }

    onHideDetail = () => {
        this.setState({
            showDetail: false
        })
    }

    render(){
        const title = this.props.bookInfo.title
        const author = (this.props.bookInfo.authors) || ''

        // Prevents crashing if the current book doesn't have a thumbnail
        const coverUrl = (this.props.bookInfo.imageLinks) ? (this.props.bookInfo.imageLinks.thumbnail) : ('')

        // If props doesn't come with a shelf, it uses checkBookOnDisplay to resolve it
        const shelf = (this.props.bookInfo.shelf) || (this.props.checkBookOnDisplay(this.props.bookInfo))
        
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" onClick={() => this.onShowDetail()} style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.onChangeHandler} value={shelf}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author[0]}</div>
            </div>
        )
    }
}

export default Book