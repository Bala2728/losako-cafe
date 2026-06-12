import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  { id: 1,  name: 'Cappuccino',    cat: 'Hot Coffee',     price: 120, stock: 'Available', tag: 'Bestseller', emoji: '☕' },
  { id: 2,  name: 'Latte',         cat: 'Hot Coffee',     price: 130, stock: 'Available', tag: '',           emoji: '🥛' },
  { id: 3,  name: 'Espresso',      cat: 'Hot Coffee',     price: 90,  stock: 'Available', tag: '',           emoji: '☕' },
  { id: 4,  name: 'Cold Coffee',   cat: 'Cold Beverages', price: 150, stock: 'Available', tag: 'Trending',   emoji: '🧋' },
  { id: 5,  name: 'Cold Brew',     cat: 'Cold Beverages', price: 160, stock: 'Low Stock', tag: '',           emoji: '🥤' },
  { id: 6,  name: 'Croissant',     cat: 'Bakery',         price: 80,  stock: 'Available', tag: 'Bestseller', emoji: '🥐' },
  { id: 7,  name: 'Sandwich',      cat: 'Snacks',         price: 110, stock: 'Available', tag: '',           emoji: '🥪' },
  { id: 8,  name: 'Brownie Cake',  cat: 'Desserts',       price: 100, stock: 'Available', tag: 'Popular',    emoji: '🍰' },
  { id: 9,  name: 'Muffin',        cat: 'Bakery',         price: 70,  stock: 'Available', tag: '',           emoji: '🧁' },
  { id: 10, name: 'Iced Mocha',    cat: 'Cold Beverages', price: 160, stock: 'Available', tag: 'New',        emoji: '🧊' },
  { id: 11, name: 'Waffle',        cat: 'Desserts',       price: 120, stock: 'Low Stock', tag: '',           emoji: '🧇' },
  { id: 12, name: 'Filter Coffee', cat: 'Hot Coffee',     price: 60,  stock: 'Available', tag: '',           emoji: '☕' },
];

const productSlice = createSlice({
  name: 'products',
  initialState: { list: initialProducts, nextId: 13 },
  reducers: {
    addProduct: (state, action) => {
      state.list.push({ ...action.payload, id: state.nextId++ });
    },
    updateProduct: (state, action) => {
      const idx = state.list.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload };
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
