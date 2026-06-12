import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { loading: false, error: null, toast: null, sidebarOpen: true },
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload; },
    setError:   (state, action) => { state.error = action.payload; },
    clearError:  (state) => { state.error = null; },
    showToast:  (state, action) => { state.toast = action.payload; },
    clearToast:  (state) => { state.toast = null; },
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setSidebar: (state, action) => { state.sidebarOpen = action.payload; },
  },
});

export const { setLoading, setError, clearError, showToast, clearToast, toggleSidebar, setSidebar } = uiSlice.actions;
export default uiSlice.reducer;
