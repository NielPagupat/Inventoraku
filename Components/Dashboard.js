import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavigation from '../NavigationBars/TopNavigation';
import BottomNavigation from '../NavigationBars/BottomNavigation';

export default function Dashboard({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%'}}><TopNavigation /></View>
      <View style={styles.content}><Text>Yawa</Text></View>
      <View style={{width:'100%'}}><BottomNavigation Navigation = {navigation}/></View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content:{
    flex:1
  }
});