import React, { useState, useEffect } from 'react';
import ExpenseList from './../components/ExpenseList';
import AddExpense from './../components/AddExpense';
import Axios from 'axios';
import { Container, Typography, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import { Category } from '@mui/icons-material';
import Calendar from 'react-calendar';
import Sidebar from "./../components/Sidebar";
import Auth from './Auth';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  userId: number;
}

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>(['Food', 'Transport', 'Entertainment', 'Utilities', 'Other']);
  const [newCategory, setNewCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().split('T')[0].slice(0, 7));
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(
    Number(localStorage.getItem("userId")) || null
  );

  const dailyExpenses = expenses.filter(expense => expense.date === selectedDate?.toISOString().split('T')[0]);

  useEffect(() => {
    if (userId){
        fetchExpenses();
    }
  },[userId]);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("JWT token is missing. Please log in.");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:8080/api/expenses/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching expenses: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    fetchExpenses();
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleClickDay = (date: { getFullYear: () => number; getMonth: () => number; getDate: () => number; }) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    setSelectedDate(utcDate);
    setOpen(true);
  };

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      const utcDate = new Date(Date.UTC(activeStartDate.getFullYear(), activeStartDate.getMonth(), activeStartDate.getDate()));
      setSelectedMonth(utcDate.toISOString().split('T')[0].slice(0, 7));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    setUserId(null); // ユーザーIDのリセット
  };
  
  if (!userId) {
    return <Auth setUserId={setUserId} />;
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Paper elevation={6} style={{ padding: '20px', backgroundColor: '#FFF3E0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom style={{ color: '#D2691E' }}>
            家計簿
          </Typography>
          <AddExpense onAddExpense={handleAddExpense} categories={categories} />
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleAddCategory} variant="contained" style={{ marginTop: '10px' }}>Add Category</Button>
          <div style = {{marginTop: '40px'}}>
            <Calendar
              onClickDay={handleClickDay}
              onActiveStartDateChange={handleActiveStartDateChange}
            />
          </div>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{selectedDate?.toISOString().split('T')[0]} の支出</DialogTitle>
            <DialogContent>
              {dailyExpenses.length > 0 ? (
                <List>
                  {dailyExpenses.map((expenses) => (
                    <ListItem key={expenses.id}>
                      <ListItemText primary={`${expenses.category}: ¥${expenses.amount}`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>支出はありません</Typography>
              )}
            </DialogContent>
          </Dialog>
        </div>

        <div style={{ flex: 1 }}>
          <ExpenseList expenses={expenses} setExpenses={setExpenses} categories={categories} selectedMonth={selectedMonth}/>
        </div>
      </Paper>
      <Button
        onClick={handleLogout}
        variant="outlined"
        style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        }}
      >
        ログアウト
      </Button>
    </Container>
  );
};

export default Home;
