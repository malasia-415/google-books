import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

import './SearchResult.css';
import genericBook from './generic-book.png';

const SearchResult = (props) => {
    const { book, bookshelfId, onRemoveBookFromBookshelf } = props;
    const smallThumbnail = getThumbnail(book) || genericBook;
    const authorList = getAuthorList(book);

    const showDeleteIcon = bookshelfId && bookshelfId !== '8'; // don't show delete button on autogenerated lists (books for you - id 8)

    function getThumbnail(book) {
        let thumbnailUrl = book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail;
        return thumbnailUrl ? thumbnailUrl.replace(/^http:\/\//i, 'https://') : '';
    }

    function getAuthorList(book) {
        let authorList = book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors;
        if (!authorList) {
            return <span>No authors to display</span>;
        }
        return authorList.map((author, index) => {
            return <span key={index}>{author}{index + 1 !== authorList.length ? ', ' : ''}</span>;
        });
    }

    function handleRemoveChange(e) {
        e.stopPropagation();
        e.preventDefault();

        onRemoveBookFromBookshelf(book.id);
    }

    return (
        <Link to={`/book/${book.id}`}>
            <ListItem>
                <ListItemIcon>
                    <img className="book-thumbnail" src={smallThumbnail} alt={smallThumbnail ? book.volumeInfo.title : 'no-image'} />
                </ListItemIcon>
                <ListItemText primary={book.volumeInfo.title} secondary={authorList} />
                {
                    showDeleteIcon ?
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete" onClick={handleRemoveChange}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction> :
                    ''
                }
            </ListItem>
        </Link>
    )
}

export default SearchResult;

