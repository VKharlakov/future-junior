import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
export const API_KEY = "AIzaSyCMgPCBbY5NFrl_sniAn3_snP5tqPaUS8c";

interface Book {
  book: Record<string, any>;
  id: string;
  volumeInfo: Record<string, any>;
}

interface ErrorResponse {
  message: string;
  code?: number;
}

interface BookState {
  data: Book[] | Book;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ErrorResponse | null;
}

const initialState: BookState = {
  data: [],
  status: "idle",
  error: null,
};

// API запрос к Google Books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (searchQuery: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${searchQuery}`);
      const data = await response.json();

      if (data.items) {
        //   Если возвращает список книг, вернуть список
        return data.items as Book[];
      }

      //   Иначе, вернуть книгу
      return data as Book;
    } catch (err: any) {
      const errorResponse: ErrorResponse = {
        message: "Произошла ошибка",
      };
      if (err.response && err.response.status) {
        errorResponse.code = err.response.status;
      }
      return rejectWithValue(errorResponse);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        console.log("api: status changed to LOADING");
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        console.log("api: status changed to SUCCEEDED");
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        console.log("api: status changed to FAILED");
        state.status = "failed";
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default booksSlice.reducer;
