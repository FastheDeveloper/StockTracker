import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Navigation from './src/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState,useEffect } from 'react';

export default function App() {

  return (
    <NavigationContainer
    theme={{
    dark: false,
      colors: {
        background: "#121212",
        primary: '',
        card: '',
        text: '',
        border: '',
        notification: ''
      },
    }}
    >
     <GestureHandlerRootView  style={styles.container}>
      <Navigation/>
    </GestureHandlerRootView>

    <StatusBar translucent={true} />
    <Toast
    //@ts-ignore
      ref={(ref) => (global.toast = ref)}
      swipeEnabled={true}
      offsetTop={50}
      animationType="slide-in"
      placement="top"
      // defaultDuration={2000}
    />
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 35,
  },
});
