import { RootState } from "../../app/store";
import { API_KEY, BASE_URL } from "../../utils/constants";
import { BookProfile } from "../BookProfile/bookProfileSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

// API запрос к Google Books с поиском книг
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (
    searchQuery: { searchText: string; category: string; sortBy: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${searchQuery.searchText}${`${
          searchQuery.category !== "all"
            ? `+subject:${searchQuery.category}`
            : ""
        }`}&orderBy=${searchQuery.sortBy}&maxResults=30&key=${API_KEY}`
      );
      console.log(
        `?q=${searchQuery.searchText}${`${
          searchQuery.category !== "all"
            ? `+subject:${searchQuery.category}`
            : ""
        }`}&orderBy=${searchQuery.sortBy}&maxResults=30&key=${API_KEY}`
      );
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

// API запрос к Google Books с добавлением книг
export const loadMoreBooks = createAsyncThunk(
  "books/loadMoreBooks",
  async (
    searchQuery: { searchText: string; category: string; sortBy: string },
    { rejectWithValue, getState }
  ) => {
    try {
      // Получаю startIndex для запроса с пагинацией к API
      const state = getState() as RootState;
      const startIndex = state.books.data.items.length;

      const response = await fetch(
        `${BASE_URL}?q=${searchQuery.searchText}${`${
          searchQuery.category !== "all"
            ? `+subject:${searchQuery.category}`
            : ""
        }`}&orderBy=${
          searchQuery.sortBy
        }&startIndex=${startIndex}&maxResults=30&key=${API_KEY}`
      );

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
      .addCase(loadMoreBooks.pending, (state) => {
        console.log("api: status changed to LOADING");
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        console.log("api: status changed to SUCCEEDED");
        state.status = "succeeded";

        if (action.payload.totalItems > 0) {
          state.data = {
            items: action.payload.items,
            totalItems: action.payload.totalItems,
          };
        } else {
          console.log("nothing was found");
          state.data = { items: [], totalItems: 0 };
        }
      })
      .addCase(loadMoreBooks.fulfilled, (state, action) => {
        console.log("api: status changed to SUCCEEDED");
        state.status = "succeeded";
        if (action.payload.totalItems > 0) {
          // Создать массив из id книг, которые уже есть в state.data
          const existingBookIds = state.data.items.map((book) => book.id);

          // Записать в newBooks только книги с новым id
          const newBooks = action.payload.items.filter(
            (book: any) => !existingBookIds.includes(book.id)
          );

          //   Добавить к массиву в state.data
          //   новый массив с новым книгами
          state.data = {
            items: [...state.data.items, ...newBooks],
            totalItems: action.payload.totalItems,
          };
        } else {
          console.log("nothing was found");

          state.data = { items: [], totalItems: 0 };
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        console.log("api: status changed to FAILED");
        state.status = "failed";
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default booksSlice.reducer;
