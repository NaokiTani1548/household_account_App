import { Expense } from "@/type/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text } from "react-native";
import { styles } from "@/styles/styles";

type Props = {
    item: Expense;
    handleEdit: (id: number) => void;
    confirmDelete: (id: number) => void;
};


export const renderItem = ({item, handleEdit, confirmDelete}: Props) => (
    <View style={styles.item}>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>カテゴリー: {item.category}</Text>
        <Text style={styles.itemText}>日付: {item.date}</Text>
        <Text style={styles.itemText}>料金: {item.amount} 円</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AntDesign 
          name="edit" 
          size={24} 
          color="#4CAF50" 
          onPress={() => handleEdit(item.id)} 
          style={styles.icon} 
        />
        <AntDesign 
          name="delete" 
          size={24} 
          color="#E53935" 
          onPress={() => confirmDelete(item.id)} 
          style={styles.icon} 
        />
      </View>
    </View>
  );