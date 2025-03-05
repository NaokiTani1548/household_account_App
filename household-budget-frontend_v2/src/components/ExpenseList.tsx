import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
  Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Typography, Button, IconButton, Card, CardContent, MenuItem, FormControl, Select, 
  TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import EditExpenseDialog from './EditExpenseDialog';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  categories: string[];
  selectedMonth: string;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, setExpenses, categories, selectedMonth }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);


  // カテゴリごとの支出合計を計算
const calculateCategoryTotals = (expenses: Expense[]) => {
  const categoryTotals: { [key: string]: number } = categories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {} as { [key: string]: number }); // 明示的な型アノテーションを追加

  expenses.forEach(expense => {
    if (categoryTotals[expense.category] !== undefined) {
      categoryTotals[expense.category] += expense.amount;
    }
  });

  return categoryTotals;
};


  useEffect(() => {
    const monthlyExpenses = expenses.filter(expense => expense.date.startsWith(selectedMonth));
    const newTotalAmount = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(newTotalAmount);
    const categoryTotals = calculateCategoryTotals(monthlyExpenses);
    setCategoryTotals(categoryTotals);
  }, [selectedMonth, expenses]);

  const [categoryTotals, setCategoryTotals] = useState<{ [key: string]: number }>({});

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8080/api/expenses/${id}`)
      .then(() => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
      })
      .catch(error => {
        console.error('Error deleting expense:', error);
      });
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditOpen(true);
  };

  const handleUpdate = (updatedExpense: Expense) => {
    setExpenses(prevExpenses => prevExpenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
  };
  
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>

      <EditExpenseDialog 
        open={editOpen} 
        onClose={() => setEditOpen(false)} 
        expense={selectedExpense} 
        onUpdate={handleUpdate} 
        categories={categories}
      />

      <Card sx={{ margin: '20px auto', padding: '10px', maxWidth: 400, backgroundColor: '#FFF3E0' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#D2691E' }}>
            {selectedMonth} の合計支出: ¥{totalAmount}
          </Typography>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <Typography key={category} variant="body1">
              {category}: ¥{total}
            </Typography>
          ))}
        </CardContent>
      </Card>

      <List sx={{ maxWidth: 400, margin: 'auto', backgroundColor: '#FFF8E1', borderRadius: '10px', padding: '10px' }}>
        {expenses.filter(expense => expense.date.startsWith(selectedMonth)).map((expense) => (
          <ListItem key={expense.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(expense)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(expense.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={`${expense.category}: ¥${expense.amount} (${expense.date})`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ExpenseList;
