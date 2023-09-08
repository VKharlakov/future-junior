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
  data: { items: Book[] | Book; totalItems: number };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ErrorResponse | null;
}

const initialState: BookState = {
  data: { items: [], totalItems: 0 },
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

      return data;
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
        console.log(action.payload);
        state.data.items = action.payload.items;
        state.data.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        console.log("api: status changed to FAILED");
        state.status = "failed";
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default booksSlice.reducer;
