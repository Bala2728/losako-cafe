import { createSlice } from '@reduxjs/toolkit';

const seed = [
  { id: 1, category: 'Milk & Dairy',      icon: '🥛', monthly: 18000, pct: 28, month: '2026-06', note: 'Regular supplier - Arokya Dairy' },
  { id: 2, category: 'Coffee Beans',      icon: '☕', monthly: 14000, pct: 22, month: '2026-06', note: 'Coorg Arabica blend'              },
  { id: 3, category: 'Staff Salary',      icon: '👥', monthly: 24000, pct: 37, month: '2026-06', note: '4 staff members'                  },
  { id: 4, category: 'Rent',              icon: '🏠', monthly: 15000, pct: 23, month: '2026-06', note: 'White Town, Pondicherry'           },
  { id: 5, category: 'Packaging',         icon: '📦', monthly:  4500, pct:  7, month: '2026-06', note: 'Cups, lids, bags'                  },
  { id: 6, category: 'Electricity',       icon: '⚡', monthly:  3200, pct:  5, month: '2026-06', note: 'TANGEDCO bill'                     },
  { id: 7, category: 'Bakery Ingredients',icon: '🌾', monthly:  6000, pct:  9, month: '2026-06', note: 'Flour, butter, eggs'               },
  { id: 8, category: 'Miscellaneous',     icon: '🔧', monthly:  2800, pct:  4, month: '2026-06', note: 'Cleaning, maintenance'             },
];

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: { list: seed, nextId: 9 },
  reducers: {
    addExpense: (state, action) => {
      const total = [...state.list, action.payload].reduce((s, e) => s + e.monthly, 0);
      const newExpense = { ...action.payload, id: state.nextId++, pct: Math.round((action.payload.monthly / total) * 100) };
      // Recalc all pcts
      state.list.push(newExpense);
      const newTotal = state.list.reduce((s, e) => s + e.monthly, 0);
      state.list = state.list.map(e => ({ ...e, pct: Math.round((e.monthly / newTotal) * 100) }));
    },
    updateExpense: (state, action) => {
      const idx = state.list.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload };
      const total = state.list.reduce((s, e) => s + e.monthly, 0);
      state.list = state.list.map(e => ({ ...e, pct: Math.round((e.monthly / total) * 100) }));
    },
    deleteExpense: (state, action) => {
      state.list = state.list.filter(e => e.id !== action.payload);
      const total = state.list.reduce((s, e) => s + e.monthly, 0);
      if (total > 0) state.list = state.list.map(e => ({ ...e, pct: Math.round((e.monthly / total) * 100) }));
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
