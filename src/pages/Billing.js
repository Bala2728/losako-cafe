import React from 'react';
import { useSelector } from 'react-redux';
import BillList     from '../components/billing/BillList';
import BillForm     from '../components/billing/BillForm';
import BillView     from '../components/billing/BillView';
import InvoicePreview from '../components/billing/InvoicePreview';

export default function Billing() {
  const { viewMode, selectedBill } = useSelector(s => s.billing);

  if (viewMode === 'create')  return <BillForm />;
  if (viewMode === 'edit')    return <BillForm editBill={selectedBill} />;
  if (viewMode === 'view')    return <BillView />;
  if (viewMode === 'invoice') return <InvoicePreview />;
  return <BillList />;
}
