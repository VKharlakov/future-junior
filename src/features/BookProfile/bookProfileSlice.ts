import { API_KEY, BASE_URL } from "../../utils/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface BookProfile {
  book: Record<string, any>;
  id: string;
  volumeInfo: Record<string, any>;
}

interface ErrorResponse {
  message: string;
  code?: number;
}

interface BookProfileState {
  data: BookProfile;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: ErrorResponse | null;
}

const initialState: BookProfileState = {
  data: { book: {}, id: "", volumeInfo: {} },
  status: "idle",
  error: null,
};

// API запрос к Google Books с поиском книги по id
export const fetchBookProfile = createAsyncThunk(
  "bookProfile/fetchBookProfile",
  async (bookId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${bookId}?key=${API_KEY}`);
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

const bookProfile = createSlice({
  name: "bookProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBookProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default bookProfile.reducer;
