export type Book = {
  id: number;
  title: string;
  author: string;
  available: string;
  publishedDate?: string;
}

export interface PaginatedBooks {
  data: Book[];
  meta: {
    page: number;             // current page
    totalPages: number;       // total pages
    prev_page_url?: string | null;
    next_page_url?: string | null;
  };
}

