import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavigation from '../NavigationBars/TopNavigation'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import axios from 'axios'
import MyDataTable from '../Helpers/MyDataTable'
import { useNavigation, useRoute } from '@react-navigation/native'
import Link from '../Helpers/API'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleInfo, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
export default function Inventory() {

  const navigation = useNavigation()
  const route = useRoute()
  const {email, userID} = route.params
  const [allProducts, SetAllProducts] = useState([])
  
  useEffect(()=>{
    
    const get = async () =>{
      const all = await axios.get(Link('/getProduct'),{params:{
        'userID': userID
      }})
      SetAllProducts(all.data.userData)
      
    }
    
    const refreshTimer = setInterval(() => {
      get()
    }, 10000);
    
    get()

    return () => {
      clearInterval(refreshTimer);
    }
  },[])

  const showUID = () => {
    console.log(email)
  }
  const goToAdd = () =>{
    navigation.navigate('AddProduct',{email, userID})
  }
  const goToDashBoard = () => {
    navigation.navigate('Dashboard', {email})
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FFFBF3'}}>
      <View style={{backgroundColor:'#F5F5F5'}}><TopNavigation val="Dashboard" Email={email} onPress={goToDashBoard}/></View>
      <View style={{flex:1, width:'100%'}}>
        <View style={{flexDirection:'row', marginTop:15, alignItems:'center', marginLeft:15}}>
          <TextInput placeholder='Search Inventory...' activeUnderlineColor='transparent' underlineColor='transparent' style={{width:'50%', height:35, marginRight:15, borderRadius:10, borderTopLeftRadius:10, borderTopRightRadius:10, backgroundColor:'#D9D9D9'}}/>
          <TouchableOpacity style={{backgroundColor:'#D9D9D9', width:35, height:35, justifyContent:'center', alignItems:'center', borderRadius:20}}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </TouchableOpacity>
        </View>
        <MyDataTable products={ allProducts } email = {email}/>
      </View>
      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', marginVertical:15}}>
        <TouchableOpacity onPress={showUID}>
          <Text style={{fontWeight:'bold', color:'#987554', marginRight:10}}>Order Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToAdd}>
          <Text style={{fontWeight:'bold', color:'#987554', marginRight:10}}>Add Product</Text>
        </TouchableOpacity>
      </View>
      <View><BottomNavigation Email={email}/></View>
    </SafeAreaView>
  )
}