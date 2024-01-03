import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavigation from '../NavigationBars/TopNavigation'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import axios from 'axios'
import Link from '../Helpers/API'
import { Button, Modal, Portal } from 'react-native-paper'
import { faCircle, faCircleXmark, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
export default function OrderDetails() {
    const navigation = useNavigation()
    const route = useRoute()
    const {email} = route.params
    const {userID} = route.params
    const [orderInfo, setOrderInfo] = useState([])
    const [open, setOpen] = useState(false);

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

    const openIndividualProduct = () => {
        setOpen(!open);
      }

    const orderReceived = () => {
        setOpen(!open);
        // order received button codes here
    }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FFFBF3'}}>
        <View>
            <TopNavigation Email = {email} val = 'Inventory' onPress={goToInventory}/>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', margin: 15}}>
            <Button mode={selectedInterval === 'Incomplete' ? 'contained' : 'outlined'} buttonColor={selectedInterval=== 'Incomplete' ? '#987554' : ''} textColor={selectedInterval=== 'Incomplete' ? 'white' : '#987554'} onPress={()=>handleIntervalChange('Incomplete')}>Incomplete</Button>
            <Button mode={selectedInterval === 'Completed' ? 'contained' : 'outlined'} buttonColor={selectedInterval=== 'Completed' ? '#987554' : ''} textColor={selectedInterval=== 'Completed' ? 'white' : '#987554'} onPress={()=>handleIntervalChange('Completed')}>Completed</Button>
        </View>
        <ScrollView style={{flex:1}}>
            {selectedInterval === 'Incomplete' && 
                <View >
                    {orderInfo && orderInfo.length > 0 ? (
                    orderInfo.map((obj, i) => (
                    <TouchableOpacity onPress={openIndividualProduct} style={{backgroundColor:'#D9D9D9', marginHorizontal:20, padding:20, borderRadius:20}}>
                      <View key={i}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>{obj.product_name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Price: </Text>
                            <Text>{obj.price}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Quantity: </Text>
                            <Text>{obj.quantity}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Cost: </Text>
                            <Text>{obj.totalcost}</Text>
                        </View>
                      </View></TouchableOpacity>
                    
                    
                    ))
                  ) : (
                    <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:30}}>No Incomplete Orders</Text>
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
                    <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:30}}>No Completed Orders</Text>
                )}
                </View>
            } 
        </ScrollView>

        <Portal>
        <Modal style={{marginTop:'50%', margin:20, width:'90%', height:420, backgroundColor:'#FFFBF3', borderRadius:20}} visible={open} transparent={true} onDismiss={openIndividualProduct}>
            <TouchableOpacity onPress={openIndividualProduct} style={{alignItems:'flex-end', marginHorizontal:30}}>
                <FontAwesomeIcon icon={faCircleXmark} size={30} color='#FF4E4E'/>
            </TouchableOpacity>
          <View>
            {
                orderInfo.map((obj, i) => (
                      <View style={{marginHorizontal:'10%'}} key={i}>
                        <Text style={{fontWeight:'bold', fontSize:20}}>{obj.product_name}</Text>
                        <View style={{margin:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Order ID: </Text>
                            <Text>{obj.order_id}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date Ordered: </Text>
                            <Text>{obj.date_ordered}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Product ID: </Text>
                            <Text>{obj.productID}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>User ID: </Text>
                            <Text>{obj.user_id}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Supplier Name: </Text>
                            <Text>{obj.supplier_name}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Supplier Email: </Text>
                            <Text>{obj.supplier_email}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Status: </Text>
                            <Text>{obj.status}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Price: </Text>
                            <Text>{obj.price}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Quantity: </Text>
                            <Text>{obj.quantity}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Cost: </Text>
                            <Text>{obj.totalcost}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Expected Arrival Date: </Text>
                            <Text>{obj.expected_arrival_date}</Text>
                        </View>
                        </View> 
                      </View>
                    ))
            }
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#987554', alignItems:'center', padding:10, marginVertical:10, borderRadius:10, width:'50%'}} onPress={orderReceived}>
                    <Text style={{fontWeight:'bold', color:'#F5F5F5'}}>Order Received</Text>
                </TouchableOpacity>
            </View>
            
          </View>
        </Modal>
        </Portal>
        <View>
            <BottomNavigation Email = {email}/>
        </View>
    </SafeAreaView>
  )
}