import React, { useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  SafeAreaView, 
  StatusBar 
} from "react-native";
import * as SQLite from "expo-sqlite";
import type { Expense } from "../../type/types";
import { styles } from "../../styles/styles";
import { renderItem } from "@/components/ExpenseItem";
import { ExpenseForm } from "@/components/ExpenseForm";
import { EditModal } from "@/components/EditModal";

export default function HomeScreen() {
  const [data, setData] = useState<Expense[]>([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    async function setupDataBase() {
      try {
        const db = await SQLite.openDatabaseAsync("expenses.db");
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            amount INTEGER NOT NULL,
            date TEXT NOT NULL
          );
        `);
        const result: Expense[] = await db.getAllSync("SELECT * FROM expenses;");
        setData(result);
      } catch (error) {
        console.log("Error", error);
      }
    }
    setupDataBase();
  }, []);

  const insertData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("expenses.db");
      await db.runAsync(`
        INSERT INTO expenses (category, amount, date)
        VALUES (?, ?, ?);
      `, [category, amount, date]);
      const result: Expense[] = await db.getAllSync("SELECT * FROM expenses;");
      setData(result);
      handleReset();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleEdit = (id: number) => {
    const expenseToEdit = data.find((item) => item.id === id);
    if (expenseToEdit) {
      setCategory(expenseToEdit.category);
      setAmount(expenseToEdit.amount.toString());
      setDate(expenseToEdit.date);
      setEditingId(id);
      setIsModalVisible(true);
    }
  };

  const handleUpdate = async () => {
    if (editingId !== null) {
      try {
        const db = await SQLite.openDatabaseAsync("expenses.db");
        await db.runAsync(`
          UPDATE expenses
          SET category = ?, amount = ?, date = ?
          WHERE id = ?;
        `, [category, amount, date, editingId]);
        const result: Expense[] = await db.getAllSync("SELECT * FROM expenses;");
        setData(result);
        setIsModalVisible(false);
        setEditingId(null);
        handleReset();
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const db = await SQLite.openDatabaseAsync("expenses.db");
      await db.runAsync(`DELETE FROM expenses WHERE id = ?;`, [id]);
      const result: Expense[] = await db.getAllSync("SELECT * FROM expenses;");
      setData(result);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleReset = () => {
    setCategory("");
    setAmount("");
    setDate("");
    setEditingId(null);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, {flex: 1}]}>
      <StatusBar backgroundColor="#FFA726" barStyle="light-content" />
      
      {/* メインコンテンツ */}
      <View style={[styles.content, {flex: 1}]}>
        <ExpenseForm 
          category={category}
          date={date}
          amount={amount}
          onCategoryChange={setCategory}
          onDateChange={setDate}
          onAmountChange={setAmount}
          onSubmit={insertData}
        />
        
        {/* 家計簿リスト */}
        <FlatList
          data={data}
          renderItem={({ item }) => renderItem({ item, handleDelete, handleEdit })}
          keyExtractor={(item) => item.id.toString()}
          style={[styles.list, {flex: 1}]}
          scrollEnabled={true}
        />
      </View>

      {/* 編集モーダル */}
      <EditModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
        amount={amount}
        setAmount={setAmount}
        handleUpdate={handleUpdate}
      />
    </SafeAreaView>
  );
}

