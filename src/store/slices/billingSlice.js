import { createSlice } from '@reduxjs/toolkit';

const seed = [
  { id: 'LC-001240', customer: 'Priya Krishnamurthy', phone: '98765 43210', items: [{ name: 'Cappuccino', emoji: '☕', qty: 2, price: 120 }, { name: 'Croissant', emoji: '🥐', qty: 1, price: 80 }], subtotal: 320, discount: 0, discountAmt: 0, taxRate: 5, taxAmt: 16, total: 336, status: 'Paid',    payment: 'UPI',  type: 'Walk-in', date: '2026-06-02', time: '10:14 AM', notes: '' },
  { id: 'LC-001239', customer: 'Arjun Mehta',         phone: '87654 32109', items: [{ name: 'Cold Coffee', emoji: '🧋', qty: 1, price: 150 }, { name: 'Sandwich', emoji: '🥪', qty: 1, price: 110 }], subtotal: 260, discount: 5, discountAmt: 13, taxRate: 5, taxAmt: 12, total: 259, status: 'Paid',    payment: 'Cash', type: 'Walk-in', date: '2026-06-02', time: '10:02 AM', notes: '' },
  { id: 'LC-001238', customer: 'Divya Suresh',        phone: '76543 21098', items: [{ name: 'Latte', emoji: '🥛', qty: 3, price: 130 }],                                                               subtotal: 390, discount: 0, discountAmt: 0, taxRate: 5, taxAmt: 20, total: 410, status: 'Pending', payment: 'UPI',  type: 'Online',  date: '2026-06-02', time: '9:55 AM',  notes: 'Extra hot' },
  { id: 'LC-001237', customer: 'Karthik Rajan',       phone: '65432 10987', items: [{ name: 'Espresso', emoji: '☕', qty: 1, price: 90 }, { name: 'Waffle', emoji: '🧇', qty: 1, price: 120 }],       subtotal: 210, discount: 10, discountAmt: 21, taxRate: 5, taxAmt: 9,  total: 198, status: 'Paid',    payment: 'Card', type: 'Walk-in', date: '2026-06-01', time: '9:41 AM',  notes: '' },
  { id: 'LC-001236', customer: 'Meena Selvam',        phone: '54321 09876', items: [{ name: 'Filter Coffee', emoji: '☕', qty: 2, price: 60 }, { name: 'Muffin', emoji: '🧁', qty: 2, price: 70 }],   subtotal: 260, discount: 0, discountAmt: 0, taxRate: 5, taxAmt: 13, total: 273, status: 'Overdue', payment: 'UPI',  type: 'Online',  date: '2026-05-30', time: '9:30 AM',  notes: '' },
  { id: 'LC-001235', customer: 'Rohit Pillai',        phone: '43210 98765', items: [{ name: 'Cold Brew', emoji: '🥤', qty: 1, price: 160 }, { name: 'Brownie Cake', emoji: '🍰', qty: 1, price: 100 }],subtotal: 260, discount: 0, discountAmt: 0, taxRate: 5, taxAmt: 13, total: 273, status: 'Paid',    payment: 'Cash', type: 'Walk-in', date: '2026-05-29', time: '9:15 AM',  notes: '' },
  { id: 'LC-001234', customer: 'Anitha Nair',         phone: '32109 87654', items: [{ name: 'Cappuccino', emoji: '☕', qty: 1, price: 120 }],                                                         subtotal: 120, discount: 0, discountAmt: 0, taxRate: 5, taxAmt: 6,  total: 126, status: 'Overdue', payment: 'UPI',  type: 'Walk-in', date: '2026-05-28', time: '9:00 AM',  notes: '' },
];

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    bills: seed,
    nextNum: 1241,
    selectedBill: null,
    viewMode: 'list', // list | create | edit | view | invoice
    searchQuery: '',
    statusFilter: 'All',
    dateFilter: '',
  },
  reducers: {
    setViewMode: (state, action) => { state.viewMode = action.payload; },
    setSelectedBill: (state, action) => { state.selectedBill = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload; },
    setDateFilter: (state, action) => { state.dateFilter = action.payload; },
    createBill: (state, action) => {
      const bill = {
        ...action.payload,
        id: `LC-${String(state.nextNum).padStart(6, '0')}`,
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };
      state.bills.unshift(bill);
      state.nextNum++;
      state.selectedBill = bill;
      state.viewMode = 'invoice';
    },
    updateBill: (state, action) => {
      const idx = state.bills.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) { state.bills[idx] = action.payload; state.selectedBill = action.payload; }
      state.viewMode = 'view';
    },
    deleteBill: (state, action) => {
      state.bills = state.bills.filter(b => b.id !== action.payload);
      state.selectedBill = null;
      state.viewMode = 'list';
    },
    updateBillStatus: (state, action) => {
      const { id, status } = action.payload;
      const idx = state.bills.findIndex(b => b.id === id);
      if (idx !== -1) state.bills[idx].status = status;
    },
  },
});

export const { setViewMode, setSelectedBill, setSearchQuery, setStatusFilter, setDateFilter, createBill, updateBill, deleteBill, updateBillStatus } = billingSlice.actions;
export default billingSlice.reducer;
