import { configureStore } from '@reduxjs/toolkit';
import authReducer    from './slices/authSlice';
import userReducer    from './slices/userSlice';
import billingReducer from './slices/billingSlice';
import productReducer from './slices/productSlice';
import uiReducer      from './slices/uiSlice';
import expenseReducer from './slices/expenseSlice';

export const store = configureStore({
  reducer: {
    auth:     authReducer,
    users:    userReducer,
    billing:  billingReducer,
    products: productReducer,
    ui:       uiReducer,
    expenses: expenseReducer,
  },
});

export default store;
