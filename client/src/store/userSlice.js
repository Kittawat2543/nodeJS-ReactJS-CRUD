import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 'Not North',
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value = "User login";
    },
    logout: (state) => {
      state.value = "User logout";
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
