import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import TopNavigation from '../NavigationBars/TopNavigation';
import BottomNavigation from '../NavigationBars/BottomNavigation';
import DatePicker from 'react-native-modern-datepicker';
import {getFormatedDate} from 'react-native-modern-datepicker';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import Link from '../Helpers/API';

export default function Profit() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const { userID } = route.params
  const [selectedInterval, setSelectedInterval] = useState('Daily');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('Set Date');

  const [profitInfo, setProfitInfo] = useState([]);
  const [singleItem, setSingleItem] = useState([]);

  const [content, setContent] = useState('daily')
  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    performTasksBasedOnInterval(interval);
  };

  const performTasksBasedOnInterval = (interval) => {
    switch (interval) {
      case 'Daily':
        // Perform tasks for Daily interval
        setDaily()
        setContent('daily')
        break;
      case 'Weekly':
        // Perform tasks for Weekly interval
        setWeekly()
        setContent('Weekly')
        break;
      case 'Monthly':
        // Perform tasks for Monthly interval
        setMonthly()
        setContent('monthly')
        break;
      case 'Yearly':
        // Perform tasks for Yearly interval
        setYearly()
        setContent('Yearly')
        break;
      default:
        // Handle default case if needed
        break;
    }}

    const convertDate = (originalDate) =>{
      const parts = originalDate.split('/')
      return parts.join('-')
    }
   
    const openDatePicker = () => {
      setOpen(!open);
    }
    const handleChange = (propDate) => {
      const readableDate = convertDate(propDate)
      setDate(readableDate);
    }

    const setDaily = async() => {
      const resultSingle = await axios.get(Link('/getSingleDaily'), {params:{
        'UID':userID,
        'Date':date
      }})

      const resultTotal = await axios.get(Link('/getTotalDaily'), {params:{
        'UID':userID,
        'Date':date
      }})

      setProfitInfo(resultTotal.data.record)
      setSingleItem(resultSingle.data.record)

    }

    const setWeekly = async() => {
      const resultSingle = await axios.get(Link('/getSingleWeekly'), {params:{
        'UID':userID,
        'Date':date
      }})

      const resultTotal = await axios.get(Link('/getTotalWeekly'), {params:{
        'UID':userID,
        'Date':date
      }})

      setProfitInfo(resultTotal.data.record)
      setSingleItem(resultSingle.data.record)
    }

    const setMonthly = async() => {
      const resultSingle = await axios.get(Link('/getSingleMonthly'), {params:{
        'UID':userID,
        'Date':date
      }})

      const resultTotal = await axios.get(Link('/getTotalMonthly'), {params:{
        'UID':userID,
        'Date':date
      }})

      setProfitInfo(resultTotal.data.record)
      setSingleItem(resultSingle.data.record)
    }
    const setYearly = async() => {
      const resultSingle = await axios.get(Link('/getSingleYearly'), {params:{
        'UID':userID,
        'Date':date
      }})

      const resultTotal = await axios.get(Link('/getTotalYearly'), {params:{
        'UID':userID,
        'Date':date
      }})

      setProfitInfo(resultTotal.data.record)
      setSingleItem(resultSingle.data.record)
    }
    const Search = () => {
      console.log(content)
      console.log(date)
      switch (content) {
        case 'daily':
          console.log('daily')
          setDaily()
          break;
        case 'Weekly':
          console.log('weekly')
          setWeekly()
          break;
        case 'monthly':
          console.log('Monthly')
          setMonthly()
          break;
        case 'Yearly':
          console.log('Yearly')
          setYearly()
          break;
        default:
          break;
      }
    }
      

    // useEffect(()=>{
    //   const fetchProfitData = async () => {
    //     const allProfit = await axios.get(Link('/getProfit'), {
    //       params: {
    //         'UID': userID
    //       }
    //     })

    //     const SingleItem = await axios.get(Link('/getItemProfit'), {
    //       params: {
    //         'UID': userID
    //       }
    //     })

    //     setProfitInfo(allProfit.data.allprofit)
    //     setSingleItem(SingleItem.data.itemProfit)
        
    //   }

    //   const refreshTimer = setInterval(() => {
    //     fetchProfitData()
    //   }, 10000);
      
    //   fetchProfitData()
  
    //   return () => {
    //     clearInterval(refreshTimer);
    //   }
    // },[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TopNavigation Email={email} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button onPress={() => handleIntervalChange('Daily')}>Daily</Button>
          <Button onPress={() => handleIntervalChange('Weekly')}>Weekly</Button>
          <Button onPress={() => handleIntervalChange('Monthly')}>Monthly</Button>
          <Button onPress={() => handleIntervalChange('Yearly')}>Yearly</Button>
        </View>
        <View style={{flex:1}}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', padding:5}}>
            <Text>Input Date:</Text>
            <TouchableOpacity onPress={openDatePicker} style={{marginHorizontal:10}}>
              <Text style={{color:'blue'}}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Search}><Text>Search</Text></TouchableOpacity>
             {/*replace with Icon ↑*/}
          </View>
          {/* Render content based on the selected interval */}
          {selectedInterval === 'Daily' && 
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                  <ScrollView>
                    <Text>All Profit</Text>
                    {profitInfo && profitInfo.length > 0 ? (
                      profitInfo.map((obj, i) => (
                        <View key={i}>
                          <Text>Transaction IDs:{obj.transaction_ids}</Text>
                          <Text>Total Capital: {obj.total_cost_price}</Text>
                          <Text>Total Retail: {obj.total_retail_price}</Text>
                          <Text>Profit: {obj.total_profit}</Text>
                          <Text>date: {obj.sale_date}</Text>
                        </View>
                      ))
                    ) : (
                      <Text>No profit information available</Text>
                    )}
                  </ScrollView>
                </View>
                <View style={{flex:1}}>
                  <ScrollView>
                    <Text>Individual items Sold</Text>
                    {singleItem && singleItem.length > 0 ? (
                      singleItem.map((obj, i) => (
                        <View key={i}>
                          <Text>PId: {obj.PID}</Text>
                          <Text>Product Name: {obj.product_name}</Text>
                          <Text>Product Capital: {obj.total_cost_price}</Text>
                          <Text>Product Retail: {obj.total_retail_price}</Text>
                          <Text>Total quantity: {obj.total_quantity}</Text>
                          <Text>Date: {obj.date}</Text>
                          
                        </View>
                      ))
                    ) : (
                      <Text>No Individual Profit available</Text>
                    )}
                  </ScrollView>
                </View>
            </View>
            }
          {selectedInterval === 'Weekly' && 
            <View style={{flex:1}}>
            <View style={{flex:1}}>
              <ScrollView>
                <Text>All Profit</Text>
                {profitInfo && profitInfo.length > 0 ? (
                  profitInfo.map((obj, i) => (
                    <View key={i}>
                      <Text>Transaction IDs:{obj.transaction_ids}</Text>
                      <Text>Total Capital: {obj.total_cost_price}</Text>
                      <Text>Total Retail: {obj.total_retail_price}</Text>
                      <Text>Profit: {obj.total_profit}</Text>
                      <Text>date: {obj.sale_week_range}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No Weekly profit information available</Text>
                )}
              </ScrollView>
            </View>
            <View style={{flex:1}}>
              <ScrollView>
                <Text>Individual items Sold</Text>
                {singleItem && singleItem.length > 0 ? (
                  singleItem.map((obj, i) => (
                    <View key={i}>
                      <Text>PId: {obj.PID}</Text>
                      <Text>Product Name: {obj.product_name}</Text>
                      <Text>Product Capital: {obj.total_cost_price}</Text>
                      <Text>Product Retail: {obj.total_retail_price}</Text>
                      <Text>Total quantity: {obj.total_quantity}</Text>
                      <Text>Date: {obj.sale_week_range}</Text>
                      
                    </View>
                  ))
                ) : (
                  <Text>No Weekly Individual Profit available</Text>
                )}
              </ScrollView>
            </View>
            </View>
            }
          {selectedInterval === 'Monthly' && 
            <View style={{flex:1}}>
            <View style={{flex:1}}>
              <ScrollView>
                <Text>All Profit</Text>
                {profitInfo && profitInfo.length > 0 ? (
                  profitInfo.map((obj, i) => (
                    <View key={i}>
                      <Text>Transaction IDs:{obj.transaction_ids}</Text>
                      <Text>Total Capital: {obj.total_cost_price}</Text>
                      <Text>Total Retail: {obj.total_retail_price}</Text>
                      <Text>Profit: {obj.total_profit}</Text>
                      <Text>date: {obj.sale_month}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No Monthly profit information available</Text>
                )}
              </ScrollView>
            </View>
            <View style={{flex:1}}>
              <ScrollView>
                <Text>Individual items Sold</Text>
                {singleItem && singleItem.length > 0 ? (
                  singleItem.map((obj, i) => (
                    <View key={i}>
                      <Text>PId: {obj.PID}</Text>
                      <Text>Product Name: {obj.product_name}</Text>
                      <Text>Product Capital: {obj.total_cost_price}</Text>
                      <Text>Product Retail: {obj.total_retail_price}</Text>
                      <Text>Total quantity: {obj.total_quantity}</Text>
                      <Text>Date: {obj.sale_month}</Text>
                      
                    </View>
                  ))
                ) : (
                  <Text>No Monthly Individual Profit available</Text>
                )}
              </ScrollView>
            </View>
            </View>
            }
          {selectedInterval === 'Yearly' && 
            <View style={{flex:1}}>
            <View style={{flex:1}}>
              <ScrollView>
                <Text>All Profit</Text>
                {profitInfo && profitInfo.length > 0 ? (
                  profitInfo.map((obj, i) => (
                    <View key={i}>
                      <Text>Transaction IDs:{obj.transaction_ids}</Text>
                      <Text>Total Capital: {obj.total_cost_price}</Text>
                      <Text>Total Retail: {obj.total_retail_price}</Text>
                      <Text>Profit: {obj.total_profit}</Text>
                      <Text>date: {obj.sale_year}</Text>
                    </View>
                  ))
                ) : (
                  <Text>No Yearly profit information available</Text>
                )}
              </ScrollView>
            </View>
            <View style={{flex:1}}>
              <ScrollView>
                <Text>Individual items Sold</Text>
                {singleItem && singleItem.length > 0 ? (
                  singleItem.map((obj, i) => (
                    <View key={i}>
                      <Text>PId: {obj.PID}</Text>
                      <Text>Product Name: {obj.product_name}</Text>
                      <Text>Product Capital: {obj.total_cost_price}</Text>
                      <Text>Product Retail: {obj.total_retail_price}</Text>
                      <Text>Total quantity: {obj.total_quantity}</Text>
                      <Text>Date: {obj.sale_year}</Text>
                      
                    </View>
                  ))
                ) : (
                  <Text>No Yearly Individual Profit available</Text>
                )}
              </ScrollView>
            </View>
            </View>
            }
        </View>
      </View>
      <Portal>
        <Modal style={{backgroundColor:'#987554'}} visible={open} transparent={true}>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={openDatePicker}>
              <Text>CLOSE</Text>
            </TouchableOpacity>
          </View>
          <DatePicker mode='calendar' selected={date} onDateChange={handleChange}/>
        </Modal>
      </Portal>
      <View>
        <BottomNavigation Email={email} />
      </View>
    </SafeAreaView>
  );
}