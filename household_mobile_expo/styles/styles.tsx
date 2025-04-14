import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0", // クリーム系の背景でアットホームな雰囲気
  },
  content: {
    paddingTop: 30, // ヘッダーの高さ分オフセット
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFA726",
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
    backgroundColor: "#FFCC80", // 明るいオレンジで温かみを出す
    borderRadius: 10,
    padding: 10,
  },
  item: {
    backgroundColor: "#FFB74D",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#FFF",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15, // ボタン間のスペースを広げる
    alignItems: "center", // アイコンを中央揃え
  },
  icon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownIcon: {
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#FFA726",
  },
  pickerContainer: {
    marginTop: 10,
    borderColor: "#FFA726",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
});
