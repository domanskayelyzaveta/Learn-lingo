// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { getTeachersThunk } from "./thunks";
// import { Teacher } from "../service/Api";

// interface FavoriteItem {
//   favorite?: boolean;
//   _id: string;
//   name: string;
//   surname?: string;
//   languages: string[];
//   levels: string[];
//   rating: number;
//   price_per_hour: number;
//   lessons_done: number;
//   avatar_url?: string;
//   lesson_info?: string;
//   conditions: string[];
//   experience?: string;
// }

// interface Filter {
//   price: number;
//   language: string;
//   level: string;
// }

// interface TeacherState {
//   favorites: FavoriteItem[];
//   teachersData: FavoriteItem[];
//   isLoading: boolean;
//   error: string | null;
//   hasMorePages: boolean;
//   filter: Filter;
// }

// const initialState: TeacherState = {
//   favorites: [],
//   teachersData: [],
//   isLoading: false,
//   error: null,
//   hasMorePages: true,
//   filter: { price: 0, language: "", level: "" },
// };

// const teacherSlice = createSlice({
//   name: "teachers",
//   initialState,
//   reducers: {
//     setFavorites: (state, action) => {
//       state.favorites.push(action.payload);
//     },
//     removeFromFavorites: (state, action) => {
//       state.favorites = state.favorites.filter(
//         (item) => item._id !== action.payload.id
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getTeachersThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         getTeachersThunk.fulfilled,
//         (state, action: PayloadAction<Teacher[]>) => {
//           state.isLoading = false;
//           state.error = null;
//           state.teachersData = action.payload;
//         }
//       )
//       .addCase(getTeachersThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload ? action.payload.toString() : null;
//       });
//   },
// });

// export const teacherReducer = teacherSlice.reducer;
// export const {} = teacherSlice.actions;

import {
  PayloadAction,
  createSlice,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { getTeachersThunk } from "./thunks";
import { SuccessResponse, Teacher } from "../service/Api";
import { RootState } from "./store";

interface FavoriteItem {
  favorite?: boolean;
  _id: string;
  name: string;
  surname?: string;
  languages: string[];
  levels: string[];
  rating: number;
  price_per_hour: number;
  lessons_done: number;
  avatar_url?: string;
  lesson_info?: string;
  conditions: string[];
  experience?: string;
}

interface Filter {
  price: number;
  language: string;
  level: string;
}

interface TeacherState {
  favorites: FavoriteItem[];
  teachersData: SuccessResponse<Teacher[]>;
  isLoading: boolean;
  error: string | null;
  hasMorePages: boolean;
  filter: Filter;
}

const initialState: TeacherState = {
  favorites: [],
  // teachersData: [],
  teachersData: { success: false, data: [] },
  isLoading: false,
  error: null,
  hasMorePages: true,
  filter: { price: 0, language: "", level: "" },
};

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeachersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getTeachersThunk.fulfilled,
        (state, action: PayloadAction<SuccessResponse<Teacher[]>>) => {
          state.isLoading = false;
          state.error = null;
          state.teachersData = action.payload;
        })
      .addCase(getTeachersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.toString() : null;
      });
  },
});

export const teacherReducer = teacherSlice.reducer;
export const { setFavorites, removeFromFavorites } = teacherSlice.actions;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
