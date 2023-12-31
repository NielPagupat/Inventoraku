import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import TopNavigation from '../NavigationBars/TopNavigation';
import BottomNavigation from '../NavigationBars/BottomNavigation';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import Link from '../Helpers/API';

export default function Dashboard() {
  const navigation = useNavigation()
  const route = useRoute()
  const {email} = route.params

  const [userData, setUserData] = useState([])
  const [userEmail, setUserEmail] = useState(email)

  const getData = async () => {
    try {
      const user = await axios.get(Link('/getUdata'), { params: { 'Email': userEmail } });
      setUserData(user.data.userData[0])
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toLogOut = () => {
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%'}}><TopNavigation val="Log-out" onPress={toLogOut} Email = {email}/></View>
      <View style={styles.content}><Text>{userData.id}</Text></View>
      <View></View>
      <View style={{width:'100%'}}><BottomNavigation Email = {email} /></View>
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