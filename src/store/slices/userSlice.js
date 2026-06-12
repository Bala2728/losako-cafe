import { createSlice } from '@reduxjs/toolkit';

const initialCustomers = [
  { id: 1, name: 'Priya Krishnamurthy', phone: '98765 43210', email: 'priya@email.com', visits: 42, totalSpent: 5040, loyal: true,  lastVisit: 'Today'      },
  { id: 2, name: 'Arjun Mehta',         phone: '87654 32109', email: 'arjun@email.com', visits: 35, totalSpent: 4200, loyal: true,  lastVisit: 'Yesterday'  },
  { id: 3, name: 'Divya Suresh',        phone: '76543 21098', email: 'divya@email.com', visits: 28, totalSpent: 3360, loyal: true,  lastVisit: '2 days ago' },
  { id: 4, name: 'Karthik Rajan',       phone: '65432 10987', email: 'karthik@email.com',visits: 20, totalSpent: 2400, loyal: false, lastVisit: '3 days ago' },
  { id: 5, name: 'Meena Selvam',        phone: '54321 09876', email: 'meena@email.com', visits: 18, totalSpent: 2160, loyal: false, lastVisit: '4 days ago' },
];

const userSlice = createSlice({
  name: 'users',
  initialState: { customers: initialCustomers, nextId: 6 },
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push({ ...action.payload, id: state.nextId++, visits: 0, totalSpent: 0, loyal: false, lastVisit: 'New' });
    },
    updateCustomer: (state, action) => {
      const idx = state.customers.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.customers[idx] = { ...state.customers[idx], ...action.payload };
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } = userSlice.actions;
export default userSlice.reducer;
