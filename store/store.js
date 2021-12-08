import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import eternalReducer from '../reducers/main';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    eternal: eternalReducer,
  },
});
