import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

type SectionProps = {
  title: string;
};

type SelectBoxProps = {
  title: string;
  options: string[];
};

function InputSection({title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#000'}]}>
        {title}
      </Text>
      <TextInput
        style={[
          styles.inputBox,
          {
            backgroundColor: isDarkMode ? '#fff' : '#ffe4b5', // 薄い橙色を使用
            color: isDarkMode ? '#000' : '#000',
          },
        ]}
        placeholder={`Enter ${title}`}
        placeholderTextColor={isDarkMode ? '#888' : '#555'}
      />
    </View>
  );
}

function SelectBoxSection({title, options}: SelectBoxProps): React.JSX.Element {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    closeModal();
  };
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#000'}]}>{title}</Text>
      <TouchableOpacity style={styles.selectButton} onPress={openModal}>
        <Text style={styles.selectText}>
          {selectedValue ? selectedValue : 'Select an option'}
        </Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => handleSelect(option)}>
                  <Text style={styles.modalText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#fffaf0', // 薄いクリーム色を使用
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={[styles.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView>
          <Text style={styles.appTitle}>Welcome to Household App</Text>
          <SelectBoxSection title="Category" options={['Food', 'Transport', 'Entertainment']}/>
          <InputSection title="Amount" />
          <InputSection title="Date" />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fffaf0',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff8c00',
    marginBottom: 16,
    marginTop: 40,
  },
  inputBox: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ff8c00',
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  selectButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ff8c00',
    borderRadius: 8,
    backgroundColor: '#ffe4b5',
  },
  selectText: {
    color: '#000',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ff8c00',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;