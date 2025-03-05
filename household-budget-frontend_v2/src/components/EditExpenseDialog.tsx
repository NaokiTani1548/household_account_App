import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

interface Expense {
    id: number;
    category: string;
    amount: number;
    date: string;
  }

interface EditExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
  onUpdate: (updatedExpense: Expense) => void;
  categories: string[];
}

const EditExpenseDialog: React.FC<EditExpenseDialogProps> = ({ open, onClose, expense, onUpdate, categories }) => {
  const [category, setCategory] = useState(expense?.category || '');
  const [amount, setAmount] = useState(expense?.amount.toString() || '');
  const [date, setDate] = useState(expense?.date || '');

  React.useEffect(() => {
    if (expense) {
      setCategory(expense.category);
      setAmount(expense.amount.toString());
      setDate(expense.date);
    }
  }, [expense]);

  const handleSave = () => {
    if (!expense) return;

    const updatedExpense = { ...expense, category, amount: parseFloat(amount), date };
    
    axios.put(`http://localhost:8080/api/expenses/${expense.id}`, updatedExpense)
      .then(() => {
        onUpdate(updatedExpense);
        onClose();
      })
      .catch(error => {
        console.error('Error updating expense:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>支出を編集</DialogTitle>
      <DialogContent>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Category</InputLabel>
        <Select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <TextField label="Amount" fullWidth margin="dense" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <TextField label="Date" fullWidth margin="dense" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">キャンセル</Button>
        <Button onClick={handleSave} color="primary" variant="contained">保存</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpenseDialog;
