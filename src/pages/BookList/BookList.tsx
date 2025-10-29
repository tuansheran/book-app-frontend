import React from 'react';
import { Link } from 'react-router-dom';
import { useGetBooksQuery } from '../../services/booksApi';
import type { Book } from '../../types/types';
import './BookList.css';

const BookList: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading } = useGetBooksQuery({ page });

  if (isLoading) return <div className="loading">📚 Loading books...</div>;
  if (error) return <div className="error">❌ Failed to load books.</div>;

  const books = data?.data ?? [];
  const pagination = data?.meta;

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">📖 Available Books</h1>

      {books.length ? (
        <>
          <div className="book-grid">
            {books.map((book: Book) => (
              <Link to={`/books/${book.id}`} key={book.id} className="book-card-link">
                <div className="book-card">
                  <h3>{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Published:</strong> {book.publishedDate}</p>
                  <p className={`status ${book.available === 'available' ? 'available' : 'rented'}`}>
                    {book.available === 'available' ? '✅ Available' : '❌ Rented'}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={!pagination?.prev_page_url}
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
            >
              ⬅ Previous
            </button>
            <span>Page {pagination?.page} of {pagination?.totalPages}</span>
            <button
              disabled={!pagination?.next_page_url}
              onClick={() => setPage(prev => Math.min(pagination!.totalPages, prev + 1))}
            >
              Next ➡
            </button>
          </div>
        </>
      ) : (
        <div className="no-books">No books found</div>
      )}
    </div>
  );
};

export default BookList;





