import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { Diary } from "@/type/types";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function MyDiary() {
  const [data, setData] = useState<Diary[]>([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState("naoki");

  useEffect(() => {
    async function setupDataBase() {
      try {
        const db = await SQLite.openDatabaseAsync("diary.db");
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            content TEXT NOT NULL,
            date TEXT NOT NULL
          );
        `);
        const result: Diary[] = await db.getAllSync("SELECT * FROM diary;");
        setData(result);
      } catch (error) {
        console.log("Error", error);
      }
    }
    setupDataBase();
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const postDiary = async () => {
    const currentDate = getCurrentDate();
    try {
      const db = await SQLite.openDatabaseAsync("diary.db");
      await db.runAsync(
        `
        INSERT INTO diary (user, content, date)
        VALUES (?, ?, ?);
      `,
        [user, content, currentDate]
      );
      const result: Diary[] = await db.getAllSync("SELECT * FROM diary;");
      const sortedData = result.sort((a, b) => a.id - b.id);
      setData(sortedData);
      setContent("");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>日記</Text>

      {/* 過去の日記を表示 */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryName}>{item.user}</Text>
            <Text style={styles.entryContent}>{item.content}</Text>
          </View>
        )}
      />

      {/* 日記内容入力 */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="今日の出来事を書いてください..."
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button title="日記を追加" onPress={postDiary} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#388E3C",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#81C784",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  textArea: {
    height: 100,
  },
  entry: {
    backgroundColor: "#C8E6C9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  entryDate: {
    fontSize: 14,
    color: "#8B8B8B",
    marginBottom: 1, // 日記内容との間隔
    textAlign: "left", // 左揃え
  },
  entryName: {
    fontSize: 14,
    color: "#8B8B8B",
    marginBottom: 10, // 日記内容との間隔
    textAlign: "left",
  },
  entryContent: {
    fontSize: 16,
    color: "#555",
  },
});
