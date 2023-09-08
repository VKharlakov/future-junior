import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { BookProfile } from "../BookProfile/bookProfileSlice";

interface Books {
  items: BookProfile[];
  totalItems: number;
}

interface ErrorResponse {
  message: string;
  code?: number;
}

interface BookState {
  data: Books;
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