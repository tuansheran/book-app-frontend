import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, PaginatedBooks } from '../types/types';
import { baseURI } from '../constants/api';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getBooks: builder.query<PaginatedBooks, { page?: number; author?: string; availability?: string }>({
  query: ({ page = 1, author, availability }) => {
    const params = new URLSearchParams({ page: page.toString() });

    if (author) params.append('author', author);
    if (availability) params.append('availability', availability); // use availability instead of date

    return `books?${params.toString()}`;
  },
  transformResponse: (response: { data: any[]; meta: any; links: any }) => ({
    data: response.data.map((b: any) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      publishedDate: b.published_date,
      available: b.availability, // map backend 'availability' field
    })),
    meta: {
      page: response.meta.current_page,
      totalPages: response.meta.last_page,
      prev_page_url: response.links.prev,
      next_page_url: response.links.next,
    },
  }),
}),



    getBookById: builder.query<Book, number>({
      query: (id) => `books/${id}`,
      transformResponse: (response: { data: any }) => ({
        id: response.data.id,
        title: response.data.title,
        author: response.data.author,
        publishedDate: response.data.published_date,
        available: response.data.availability,
      }),
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
      }),
    }),
    rentBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `books/${id}/rent`,
        method: 'POST',
      }),
    }),
    returnBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `books/${id}/return`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useRentBookMutation,
  useReturnBookMutation,
} = booksApi;

