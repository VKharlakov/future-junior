import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import booksReducer from "../features/Books/booksSlice";
import bookProfileReducer from "../features/BookProfile/bookProfileSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    bookProfile: bookProfileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
