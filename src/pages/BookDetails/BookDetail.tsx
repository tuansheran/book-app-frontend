import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery, useRentBookMutation, useReturnBookMutation } from '../../services/booksApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookDetail.css';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: book, error, isLoading, refetch } = useGetBookByIdQuery(Number(id));
  const [rentBook] = useRentBookMutation();
  const [returnBook] = useReturnBookMutation();

  if (isLoading) return <div className="loading">📚 Loading book details...</div>;
  if (error) return <div className="error">❌ Error loading book details.</div>;
  if (!book) return <div className="no-book">Book not found</div>;

  const handleRent = async () => {
    try {
      await rentBook(book.id).unwrap();
      toast.success(`✅ "${book.title}" rented successfully!`);
      refetch();
    } catch {
      toast.error(`❌ Failed to rent "${book.title}".`);
    }
  };

  const handleReturn = async () => {
    try {
      await returnBook(book.id).unwrap();
      toast.success(`✅ "${book.title}" returned successfully!`);
      refetch();
    } catch {
      toast.error(`❌ Failed to return "${book.title}".`);
    }
  };

  return (
    <div className="book-detail-container">
      <div className="book-card">
        <h2 className="book-title">{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Published:</strong> {book.publishedDate}</p>
        <p className={`status ${book.available === 'available' ? 'available' : 'rented'}`}>
          {book.available === 'available' ? '✅ Available' : '❌ Rented'}
        </p>

        {book.available === 'available' ? (
          <button className="action-button rent" onClick={handleRent}>
            Rent this Book
          </button>
        ) : (
          <button className="action-button return" onClick={handleReturn}>
            Return this Book
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetail;



