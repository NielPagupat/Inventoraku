import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavigation from '../NavigationBars/TopNavigation';
import BottomNavigation from '../NavigationBars/BottomNavigation';
import axios from 'axios';
export default function Dashboard({navigation}) {
  const [userData, setUserData] = useState()
  const [userEmail, setUserEmail] = useState(navigation.getParam('Email'))
  useEffect(async ()=>{
    const user = await axios.get('http://10.0.254.12:8000/api/getUdata', {params:{'Email':userEmail}})
    console.log(user.data.userData)
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%'}}><TopNavigation Navigation = {navigation}/></View>
      <View style={styles.content}></View>
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