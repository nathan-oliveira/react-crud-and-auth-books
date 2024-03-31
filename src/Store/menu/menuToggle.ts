import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'menu',
  initialState: {
    menu: false,
    sideBar: true,
  },
  reducers: {
    toggleMenu(state, action) {
      state.menu = action.payload
    },

    toggleSideBar(state, action) {
      state.sideBar = action.payload
    },
  },
});

export const { toggleMenu, toggleSideBar } = slice.actions;
export default slice.reducer;
