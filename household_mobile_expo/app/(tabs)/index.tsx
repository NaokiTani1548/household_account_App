import React, { useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  SafeAreaView, 
  StatusBar, 
  Button, 
  Text,
  Modal
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
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // 削除モーダルの表示状態
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
      setIsEditModalVisible(true);
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
        setIsEditModalVisible(false);
        setEditingId(null);
        handleReset();
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const confirmDelete = (id: number) => {
    setDeletingId(id);
    setIsDeleteModalVisible(true);
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
    setIsDeleteModalVisible(false);
    setDeletingId(null);
  };

  const handleReset = () => {
    setCategory("");
    setAmount("");
    setDate("");
    setEditingId(null);
    setDeletingId(null);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
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
          renderItem={({ item }) => renderItem({ item, handleEdit ,confirmDelete})}
          keyExtractor={(item) => item.id.toString()}
          style={[styles.list, {flex: 1}]}
          scrollEnabled={true}
        />
        <Modal
          visible={isDeleteModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsDeleteModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.label}>削除しますか？</Text>
              <View style={styles.modalButtons}>
                <Button title="確定" color="#FF0000" onPress={() => deletingId !== null && handleDelete(deletingId)} />
                <Button title="キャンセル" color="#00FF00" onPress={() => setIsDeleteModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* 編集モーダル */}
      <EditModal
        isModalVisible={isEditModalVisible}
        setIsModalVisible={setIsEditModalVisible}
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

