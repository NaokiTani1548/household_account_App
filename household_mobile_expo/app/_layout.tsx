import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'; // expo用
import { StatusBar as RNStatusBar, SafeAreaView, View, Text, StyleSheet } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <SafeAreaView style={{ flex: 1 }}>
      {/* react-native の StatusBar（背景色を設定） */}
      <RNStatusBar backgroundColor="#FFA726" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>家計簿アプリ</Text>
      </View>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* expo-status-bar の StatusBar（スタイルを自動調整） */}
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  header: {
    backgroundColor: "#FFA726",
    paddingHorizontal: 20, // 左右の余白
    paddingBottom: 10, // 下部に余白を追加
    alignItems: "center",
    justifyContent: "flex-end", // テキストを下部に配置
    width: "100%",
    height: 80,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
});
