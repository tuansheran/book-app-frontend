import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, type BookInput } from '../../schemas/bookSchema';
import { useAddBookMutation } from '../../services/booksApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddBook.css'; // optional: for custom styles

const AddBook: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookInput>({
    resolver: zodResolver(bookSchema),
  });

  const [addBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (data: BookInput) => {
    try {
      const payload = {
        title: data.title,
        author: data.author,
        published_date: data.publishedDate,
      };

      await addBook(payload).unwrap();
      toast.success('✅ Book added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add book.');
    }
  };

  // Show toast for validation errors once per submit
  React.useEffect(() => {
    Object.values(errors).forEach(err => {
      toast.error(err.message, { autoClose: 3000 });
    });
  }, [errors]);

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register('title')}
            placeholder="Enter book title"
            className={`form-input ${errors.title ? 'input-error' : ''}`}
          />
          {errors.title && <span className="error-text">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            {...register('author')}
            placeholder="Enter author name"
            className={`form-input ${errors.author ? 'input-error' : ''}`}
          />
          {errors.author && <span className="error-text">{errors.author.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="publishedDate">Published Date</label>
          <input
            id="publishedDate"
            {...register('publishedDate')}
            type="date"
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBook;


