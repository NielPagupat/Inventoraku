import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavigation from '../NavigationBars/TopNavigation'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import axios from 'axios'
import Link from '../Helpers/API'
import { Button } from 'react-native-paper'
export default function OrderDetails() {
    const navigation = useNavigation()
    const route = useRoute()
    const {email} = route.params
    const {userID} = route.params
    const [orderInfo, setOrderInfo] = useState([])

    const [content, setContent] = useState('Incomplete')
    const [selectedInterval, setSelectedInterval] = useState('Incomplete')

    const handleIntervalChange = (interval) => {
        setSelectedInterval(interval)
        performTaskBasedOnInterval(interval)
    }

    const performTaskBasedOnInterval = (interval) =>{
        switch (interval) {
            case 'Incomplete':
                getIncompleteOrders()
                setContent('Incomplete')
                break;
            case 'Completed':
                getCompletedOrder()
                setContent('Completed')
                break;
            default:
                break;
        }
    }

    const getIncompleteOrders = async () =>{
        const res = await axios.get(Link('/getIncomplete'), {params:{
            'UID':userID
        }})
        setOrderInfo(res.data.orderInfo)
    }

    const getCompletedOrder = async () => {
        const res = await axios.get(Link('/getCompleted'), {params:{
            'UID':userID
        }})
        setOrderInfo(res.data.orderInfo)
    }


    useEffect(()=>{
        getIncompleteOrders()
    }, [])
 
    const goToInventory = () => {
        navigation.navigate('Inventory', {email})
    }
  return (
    <SafeAreaView style={{flex:1}}>
        <View>
            <TopNavigation Email = {email} val = 'Inventory' onPress={goToInventory}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Button onPress={()=>handleIntervalChange('Incomplete')}>Incomplete</Button>
            <Button onPress={()=>handleIntervalChange('Completed')}>Completed</Button>
        </View>
        <ScrollView style={{flex:1}}>
            {selectedInterval === 'Incomplete' && 
                <View>
                    {orderInfo && orderInfo.length > 0 ? (
                    orderInfo.map((obj, i) => (
                    <TouchableOpacity >
                      <View key={i}>
                        <Text>order ID:{obj.order_id}</Text>
                        <Text>date Ordered: {obj.date_ordered}</Text>
                        <Text>Product ID: {obj.productID}</Text>
                        <Text>User ID: {obj.user_id}</Text>
                        <Text>Supplier Name: {obj.supplier_name}</Text>
                        <Text>Supplier Email: {obj.supplier_email}</Text>
                        <Text>Status: {obj.status}</Text>
                        <Text>Product Name: {obj.product_name}</Text>
                        <Text>Price: {obj.price}</Text>
                        <Text>Quantity: {obj.quantity}</Text>
                        <Text>Total Cost: {obj.totalcost}</Text>
                        <Text>Expected Arrival Date: {obj.expected_arrival_date}</Text>
                      </View></TouchableOpacity>
                    ))
                  ) : (
                    <Text>No Incomplete Orders</Text>
                  )}
                </View>
            }
            {selectedInterval === 'Completed' &&
                <View>
                {orderInfo && orderInfo.length > 0 ? (
                orderInfo.map((obj, i) => (
                  <View key={i}>
                    <Text>order ID:{obj.order_id}</Text>
                    <Text>date Ordered: {obj.date_ordered}</Text>
                    <Text>Product ID: {obj.productID}</Text>
                    <Text>User ID: {obj.user_id}</Text>
                    <Text>Supplier Name: {obj.supplier_name}</Text>
                    <Text>Supplier Email: {obj.supplier_email}</Text>
                    <Text>Status: {obj.status}</Text>
                    <Text>Product Name: {obj.product_name}</Text>
                    <Text>Price: {obj.price}</Text>
                    <Text>Quantity: {obj.quantity}</Text>
                    <Text>Total Cost: {obj.totalcost}</Text>
                    <Text>Expected Arrival Date: {obj.expected_arrival_date}</Text>
                  </View>
                ))
                ) : (
                    <Text>No Completed Orders</Text>
                )}
                </View>
            } 
        </ScrollView>
        <View>
            <BottomNavigation Email = {email}/>
        </View>
    </SafeAreaView>
  )
}