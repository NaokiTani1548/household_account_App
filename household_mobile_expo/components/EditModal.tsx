import { styles } from "@/styles/styles";
import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
    category: string;
    setCategory: (text: string) => void;
    date: string;
    setDate: (text: string) => void;
    amount: string;
    setAmount: (text: string) => void;
    handleUpdate: () => void;
}

export const EditModal = ({ isModalVisible, setIsModalVisible, category, setCategory, date, setDate, amount, setAmount, handleUpdate }: Props) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"形式に変換
          setDate(formattedDate);
        }
    };
    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>編集</Text>

                <Text style={styles.label}>カテゴリー：</Text>
                <TextInput
                    style={styles.input}
                    placeholder="例: 食費"
                    value={category}
                    onChangeText={setCategory}
                />

                <Text style={styles.label}>日付：</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                    style={styles.input}
                    placeholder="日付を選択"
                    value={date}
                    editable={false}
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                    value={date ? new Date(date) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleDateChange}
                    />
                )}

                <Text style={styles.label}>料金：</Text>
                <TextInput
                    style={styles.input}
                    placeholder="例: 1000"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                <Button title="更新" color="#FFA726" onPress={handleUpdate} />
                <Button title="キャンセル" onPress={() => setIsModalVisible(false)} />
                </View>
            </View>
        </Modal>
        );
    }