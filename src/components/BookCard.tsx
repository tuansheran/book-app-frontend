import type { Book } from '../types/types';
import { Link } from 'react-router-dom';

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
    <h3>{book.title}</h3>
    <p>{book.author}</p>
    <p>{book.available ? 'Available' : 'Rented'}</p>
    <Link to={`/books/${book.id}`}>View Details</Link>
  </div>
);

export default BookCard;
