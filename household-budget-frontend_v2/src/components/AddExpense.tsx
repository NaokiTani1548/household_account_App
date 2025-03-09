import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface AddExpenseProps {
  onAddExpense: (newExpense: Expense) => void;
  categories: string[];
}

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  userId: number;
}

const AddExpense: React.FC<AddExpenseProps> = ({ onAddExpense ,categories}) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const expense = { category: category, amount: parseFloat(amount), date: date ,userId: Number(userId)};
    try {
      const response = await fetch("http://localhost:8080/api/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error("Failed to add expense");
      }
      const data = await response.json();
      console.log("Expense added:", data);
      setCategory('');
      setAmount('');
      setDate('');
      onAddExpense(data);
      } catch (error) {
        console.error("Error adding expense:", error);
      }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth variant="outlined">
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
      <TextField 
        label="Amount" 
        type="number" 
        variant="outlined" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        fullWidth 
      />
      <TextField 
        label="Date" 
        type="date" 
        variant="outlined" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        InputLabelProps={{ shrink: true }} 
        fullWidth 
      />
      <Button 
        type="submit" 
        variant="contained" 
        style={{ backgroundColor: '#FFB74D', color: 'white' }}
      >
        Add Expense
      </Button>
    </Box>
  );
};

export default AddExpense;