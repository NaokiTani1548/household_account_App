import { Expense } from "@/type/types";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "@/styles/styles";
import { useCallback, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { PieChart } from "react-native-chart-kit";
import { LineChart } from "react-native-chart-kit";
import { calculateCategoryPercentages, calculateMonthlyTotals } from "@/util/data_processing";
import { Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const PieGraph = ({ data }: { data: Expense[] }) => {
  const percentages = calculateCategoryPercentages(data);
  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const chartData = Object.keys(percentages).map((category) => ({
    name: category,
    population: percentages[category],
    color: getRandomColor(), // ランダムで色を生成する関数を作ると便利です
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <PieChart
      data={chartData}
      width={Dimensions.get("window").width - 20}
      height={220}
      chartConfig={{
        color: () => "rgba(255, 255, 255, 1)",
        backgroundColor: "#FFFAFA",
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
    />
  );
};

const LineGraph = ({ data }: { data: Expense[] }) => {
  const monthlyData = calculateMonthlyTotals(data);
  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [{ data: [0, ...monthlyData.map((item) => item.total)] }],
  };

  return (
    <LineChart
      data={chartData}
      width={Dimensions.get("window").width - 20}
      height={220}
      chartConfig={{
        backgroundGradientFrom: "#FFA726",
        backgroundGradientTo: "#FF7043",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
    />
  );
};


export default function HomeScreen() {
  const [data, setData] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // "YYYY-MM" 形式
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const getCurrentYearMonth = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // JavaScriptの月は0から始まるので+1
    return `${year}-${String(month).padStart(2, "0")}`; // 月を2桁にフォーマット
  };
  const calculateMonthlyTotal = (month: string) => {
    const total = data.filter(expense => expense.date.slice(0, 7) === month)
                      .reduce((sum, expense) => sum + expense.amount, 0);
    setMonthlyTotal(total);
  };
  const fetchData = useCallback(async () => {
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
          const sortedData = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setData(sortedData);
        } catch (error) {
          console.log("Error", error);
        }
      }
      setupDataBase();
      const month = getCurrentYearMonth();
      calculateMonthlyTotal(month);
    }, []);

    useFocusEffect(
        useCallback(() => {
          fetchData();
        }, [fetchData])
      );
  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <ScrollView>
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{selectedMonth}合計支出額: {monthlyTotal} 円</Text>
        </View>
        <Text style={styles.label}>カテゴリー別支出割合</Text>
        <PieGraph data={data} />

        <Text style={styles.label}>月ごとの合計支出</Text>
        <LineGraph data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};
