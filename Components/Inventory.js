import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavigation from '../NavigationBars/TopNavigation'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import axios from 'axios'
import MyDataTable from '../Helpers/MyDataTable'
import { useNavigation, useRoute } from '@react-navigation/native'
export default function Inventory() {

  const navigation = useNavigation()
  const route = useRoute()
  const {email} = route.params
  const {userID} = route.params
  const [allProducts, SetAllProducts] = useState([])
  
  useEffect(()=>{
    const get = async () =>{
      const all = await axios.get('http://10.0.254.12:8000/api/getProduct',{params:{
        'userID': userID
      }})
      SetAllProducts(all.data.userData)
      console.log(all.data)
    }
    get()
    console.log(allProducts)
  },[navigation])

  const showUID = () => {
    console.log(email)
  }
  const goToAdd = () =>{
    navigation.navigate('AddProduct',{email, userID})
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View><TopNavigation Email={email}/></View>
      <View style={{flex:1, width:'100%'}}>
        <MyDataTable products={ allProducts } />
      </View>
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around'}}>
        <Button onPress={goToAdd}>Add Product</Button>
        <Button onPress={showUID}>Order Details</Button>
      </View>
      <View><BottomNavigation Email={email}/></View>
    </SafeAreaView>
  )
}