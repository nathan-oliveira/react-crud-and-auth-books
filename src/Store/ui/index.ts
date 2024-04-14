import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'ui',
  initialState: {
    modal: false,
    value: null,
  },
  reducers: {
    openModal(state, action) {
      state.modal = true;
      state.value = action.payload;
    },
    closeModal(state) {
      state.modal = false;
    },
  }
});

export const { openModal, closeModal } = slice.actions;
export default slice.reducer;