import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { teacherReducer } from "./slice";

const teachersPersistConfig = {
  key: "teachers",
  storage,
  whitelist: ["favorite"],
};

const favoritesPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["favorite"],
};

const store = configureStore({
  reducer: {
    teachers: persistReducer(teachersPersistConfig, teacherReducer),
    favorites: persistReducer(favoritesPersistConfig, teacherReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;