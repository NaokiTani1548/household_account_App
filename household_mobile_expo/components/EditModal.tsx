import { styles } from "@/styles/styles";
import { Modal, View, Text, TextInput, Button } from "react-native";

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
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChangeText={setDate}
                />

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