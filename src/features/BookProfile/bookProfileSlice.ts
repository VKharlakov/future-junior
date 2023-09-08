import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";

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

// API запрос к Google Books
export const fetchBookProfile = createAsyncThunk(
  "bookProfile/fetchBookProfile",
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

const bookProfile = createSlice({
  name: "bookProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookProfile.pending, (state) => {
        console.log("api: status changed to LOADING");
        state.status = "loading";
      })
      .addCase(fetchBookProfile.fulfilled, (state, action) => {
        console.log("api: status changed to SUCCEEDED");
        state.status = "succeeded";
        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(fetchBookProfile.rejected, (state, action) => {
        console.log("api: status changed to FAILED");
        state.status = "failed";
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default bookProfile.reducer;