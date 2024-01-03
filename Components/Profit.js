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
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
    <SafeAreaView style={{ flex: 1, backgroundColor:'#FFFBF3' }}>
      <View>
        <TopNavigation Email={email} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin:10 }}>
          <Button buttonColor={selectedInterval === 'Daily' ? '#987554' : ''} textColor={selectedInterval === 'Daily' ? 'white' : '#987554'} mode={selectedInterval === 'Daily' ? 'contained' : 'outlined'} onPress={() => handleIntervalChange('Daily')}>Daily</Button>
          <Button buttonColor={selectedInterval === 'Weekly' ? '#987554' : ''} textColor={selectedInterval === 'Weekly' ? 'white' : '#987554'} mode={selectedInterval === 'Weekly' ? 'contained' : 'outlined'} onPress={() => handleIntervalChange('Weekly')}>Weekly</Button>
          <Button buttonColor={selectedInterval === 'Monthly' ? '#987554' : ''} textColor={selectedInterval === 'Monthly' ? 'white' : '#987554'} mode={selectedInterval === 'Monthly' ? 'contained' : 'outlined'} onPress={() => handleIntervalChange('Monthly')}>Monthly</Button>
          <Button buttonColor={selectedInterval === 'Yearly' ? '#987554' : ''} textColor={selectedInterval === 'Yearly' ? 'white' : '#987554'} mode={selectedInterval === 'Yearly' ? 'contained' : 'outlined'} onPress={() => handleIntervalChange('Yearly')}>Yearly</Button>
        </View>
        <View style={{flex:1, marginHorizontal: 20}}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', padding:5}}>
            <Text style={{}}>Input Date:</Text>
            <TouchableOpacity onPress={openDatePicker} style={{marginLeft:5, marginRight:10, backgroundColor:'#D9D9D9', padding:5, borderRadius:5}}>
              <Text style={{color:'blue'}}>{date}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Search}>
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </TouchableOpacity>
          </View>
          {selectedInterval === 'Daily' && 
            <View style={{flex:1}}>
                <View style={{flex:1, backgroundColor:'#DEDEDE', borderRadius:20, marginVertical:10}}>
                  <ScrollView style={{margin:20}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>All Profit</Text>
                    {profitInfo && profitInfo.length > 0 ? (
                      profitInfo.map((obj, i) => (
                        <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.transaction_ids}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Profit: </Text>
                            <Text>{obj.total_profit}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.sale_date}</Text>
                          </View>    
                        </View>
                      ))
                    ) : (
                      <Text>No profit information available</Text>
                    )}
                  </ScrollView>
                </View>
                <View style={{flex:1.8, backgroundColor:'#DEDEDE', borderRadius:20, marginBottom:10}}>
                  <ScrollView style={{margin:20}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}>Individual items Sold</Text>
                    {singleItem && singleItem.length > 0 ? (
                      singleItem.map((obj, i) => (
                        <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.PID}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.product_name}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Quantity: </Text>
                            <Text>{obj.total_quantity}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.date}</Text>
                          </View>    
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
            <View style={{flex:1, backgroundColor:'#DEDEDE', borderRadius:20, marginVertical:10}}>
              <ScrollView style={{margin:20}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>All Profit</Text>
                {profitInfo && profitInfo.length > 0 ? (
                  profitInfo.map((obj, i) => (
                    <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.transaction_ids}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Profit: </Text>
                            <Text>{obj.total_profit}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.sale_week_range}</Text>
                          </View>    
                        </View>
                  ))
                ) : (
                  <Text>No Weekly profit information available</Text>
                )}
              </ScrollView>
            </View>
            <View style={{flex:1.8, backgroundColor:'#DEDEDE', borderRadius:20, marginBottom:10}}>
              <ScrollView style={{margin:20}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>Individual items Sold</Text>
                {singleItem && singleItem.length > 0 ? (
                  singleItem.map((obj, i) => (
                    <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.PID}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.product_name}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Quantity: </Text>
                            <Text>{obj.total_quantity}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.sale_week_range}</Text>
                          </View>    
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
            <View style={{flex:1, backgroundColor:'#DEDEDE', borderRadius:20, marginVertical:10}}>
              <ScrollView style={{margin:20}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>All Profit</Text>
                {profitInfo && profitInfo.length > 0 ? (
                  profitInfo.map((obj, i) => (
                    <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.transaction_ids}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Profit: </Text>
                            <Text>{obj.total_profit}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.sale_month}</Text>
                          </View>    
                        </View>
                  ))
                ) : (
                  <Text>No Monthly profit information available</Text>
                )}
              </ScrollView>
            </View>
            <View style={{flex:1.8, backgroundColor:'#DEDEDE', borderRadius:20, marginBottom:10}}>
              <ScrollView style={{margin:20}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>Individual items Sold</Text>
                {singleItem && singleItem.length > 0 ? (
                  singleItem.map((obj, i) => (
                    <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.PID}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.product_name}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Quantity: </Text>
                            <Text>{obj.total_quantity}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.sale_month}</Text>
                          </View>    
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
            <View style={{flex:1, backgroundColor:'#DEDEDE', borderRadius:20, marginVertical:10}}>
              <ScrollView style={{margin:20}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>All Profit</Text>
                {profitInfo && profitInfo.length > 0 ? (
                  profitInfo.map((obj, i) => (
                    <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.transaction_ids}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Profit: </Text>
                            <Text>{obj.total_profit}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.sale_year}</Text>
                          </View>    
                        </View>
                  ))
                ) : (
                  <Text>No Yearly profit information available</Text>
                )}
              </ScrollView>
            </View>
            <View style={{flex:1.8, backgroundColor:'#DEDEDE', borderRadius:20, marginBottom:10}}>
              <ScrollView style={{margin:20}}>
                <Text style={{fontWeight:'bold', fontSize:20}}>Individual items Sold</Text>
                {singleItem && singleItem.length > 0 ? (
                  singleItem.map((obj, i) => (
                    <View style={{margin:10}} key={i}>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.PID}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Transaction IDs: </Text>
                            <Text>{obj.product_name}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Capital: </Text>
                            <Text>{obj.total_cost_price}</Text>  
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Total Retail: </Text>
                            <Text>{obj.total_retail_price}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Quantity: </Text>
                            <Text>{obj.total_quantity}</Text>
                          </View>
                          <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>Date: </Text>
                            <Text>{obj.sale_year}</Text>
                          </View>    
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
        <Modal style={{marginTop:'50%', margin:20, width:'90%', height:450, backgroundColor:'#F5F5F5', borderRadius:20, padding:35}} visible={open} transparent={true}>
          <View style={{alignItems:'center', marginBottom:5}}>
          <DatePicker options={{textHeaderColor:'#987554', mainColor:'#987554', selectedTextColor:'#F5F5F5'}} style={{backgroundColor:'#F5F5F5'}} mode='calendar' selected={date} onDateChange={handleChange}/>
            <TouchableOpacity onPress={openDatePicker}>
              <Text style={{fontWeight:'bold'}}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <View>
        <BottomNavigation Email={email} />
      </View>
    </SafeAreaView>
  );
}