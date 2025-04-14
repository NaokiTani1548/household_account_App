import React, { useState, useEffect, useCallback } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  SafeAreaView, 
  StatusBar, 
} from "react-native";
import * as SQLite from "expo-sqlite";
import { Calendar } from "react-native-calendars";
import type { Expense } from "../../type/types";
import { useFocusEffect } from "@react-navigation/native";


export default function ExpenseCalendarScreen() {
  const [data, setData] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // "YYYY-MM" 形式
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [categorizedExpenses, setCategorizedExpenses] = useState<any>({});

  const fetchAndUpdateData = useCallback(async () => {
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

      // 月ごとの計算やカテゴリ分けを再実行
      calculateMonthlyTotal(selectedMonth);
      categorizeExpenses(selectedMonth);
    } catch (error) {
      console.log("Error", error);
    }
  }, [selectedMonth]);

  useFocusEffect(
    useCallback(() => {
      fetchAndUpdateData();
    }, [fetchAndUpdateData])
  );

  useEffect(() => {
    calculateMonthlyTotal(selectedMonth);
    categorizeExpenses(selectedMonth);
  }, [selectedMonth, data]);

  // 月ごとの支出合計を計算
  const calculateMonthlyTotal = (month: string) => {
    const total = data.filter(expense => expense.date.slice(0, 7) === month)
                      .reduce((sum, expense) => sum + expense.amount, 0);
    setMonthlyTotal(total);
  };

  // 月ごとのカテゴリーごとの支出を計算
  const categorizeExpenses = (month: string) => {
    const expensesInMonth = data.filter(expense => expense.date.slice(0, 7) === month);

    const categorized = expensesInMonth.reduce((acc: Record<string, { total: number; items: Expense[] }>, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = {
          total: 0,
          items: [],
        };
      }
      acc[expense.category].total += expense.amount;
      acc[expense.category].items.push(expense);
      return acc;
    }, {});

    setCategorizedExpenses(categorized);
  };

  // カレンダーの日付が変更されたとき
  const onMonthChange = (month: { dateString: string }) => {
    const selectedMonth = month.dateString.slice(0, 7); // "YYYY-MM" 形式に切り取る
    setSelectedMonth(selectedMonth);
  };

  const renderCategoryItem = ({ item, index }: { item: any, index: number }) => {
    const categoryName = Object.keys(categorizedExpenses)[index];
    return(
      <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{categoryName}</Text>
      <Text style={styles.amountText}>{item.total} 円</Text>
      <FlatList
        data={item.items}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.date}</Text>
            <Text>{item.amount} 円</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    );
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFA726" barStyle="light-content" />
      
      {/* カレンダー表示 */}
      <Calendar
        current={selectedMonth + "-01"}
        onMonthChange={onMonthChange}
        monthFormat={'yyyy MM'}
        hideExtraDays
      />

      {/* 月の合計支出額 */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{selectedMonth}合計支出額: {monthlyTotal} 円</Text>
      </View>

      {/* カテゴリーごとのデータ表示 */}
      <FlatList
        data={Object.values(categorizedExpenses)}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0",
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFCC80",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  categoryItem: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FFB74D",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  amountText: {
    fontSize: 14,
    color: "#333",
  },
  expenseItem: {
    backgroundColor: "#FF9800",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
  },
});
