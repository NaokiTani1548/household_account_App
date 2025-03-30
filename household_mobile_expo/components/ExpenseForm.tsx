import { styles } from "@/styles/styles";
import { TextInput, View, Text, Button } from "react-native";

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
    return (
    <View>
      <Text style={styles.label}>カテゴリー：</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 食費"
        value={category}
        onChangeText={onCategoryChange}
      />
      <Text style={styles.label}>日付：</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={onDateChange}
      />
      <Text style={styles.label}>料金：</Text>
      <TextInput
        style={styles.input}
        placeholder="例: 1000"
        keyboardType="numeric"
        value={amount}
        onChangeText={onAmountChange}
      />
      <Button title="追加" color="#FFA726" onPress={onSubmit} />
    </View>
    );

} ;