import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavigation from '../NavigationBars/TopNavigation'
import BottomNavigation from '../NavigationBars/BottomNavigation'
export default function Inventory({navigation}) {
  return (
    <SafeAreaView style={{flex:1}}>
      <View><TopNavigation Navigation={navigation}/></View>
      <View style={{flex:1}}><Text>Push</Text></View>
      <View>
        <Button>Add Product</Button>
        <Button>Order Details</Button>
      </View>
      <View><BottomNavigation Navigation={navigation}/></View>
    </SafeAreaView>
  )
}