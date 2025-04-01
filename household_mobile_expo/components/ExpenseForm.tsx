import { styles } from "@/styles/styles";
import { useState } from "react";
import { TextInput, View, Text, Button, Platform, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
    category: string;
    date: string;
    amount: string;
    onCategoryChange: (text: string) => void;
    onDateChange: (text: string) => void;
    onAmountChange: (text: string) => void;
    onSubmit: () => void;
};

export const ExpenseForm = ({category, date, amount, onCategoryChange, onDateChange, onAmountChange, onSubmit}: Props) => {
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        onCategoryChange(value);
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"形式に変換
          onDateChange(formattedDate);
        }
    };

    const handleSubmit = () => {
        onSubmit();
        setSelectedCategory("");
    };

    return (
    <View>
      <Text style={styles.label}>カテゴリー：</Text>
      <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
          >
            <Picker.Item label="その他" value="" />
            <Picker.Item label="食費" value="食費" />
            <Picker.Item label="交通費" value="交通費" />
            <Picker.Item label="娯楽費" value="娯楽費" />
          </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="その他のカテゴリー"
        value={selectedCategory}
        onChangeText={handleCategoryChange}
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
        onChangeText={onAmountChange}
      />
      <Button title="追加" color="#FFA726" onPress={handleSubmit} />
    </View>
    );

} ;