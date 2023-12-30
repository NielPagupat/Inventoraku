import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import TopNavigation from '../NavigationBars/TopNavigation';
import BottomNavigation from '../NavigationBars/BottomNavigation';
import DatePicker from 'react-native-modern-datepicker';
import {getFormatedDate} from 'react-native-modern-datepicker';
import { Modal, Portal } from 'react-native-paper';

export default function Profit() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [selectedInterval, setSelectedInterval] = useState('Daily');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();


  const [content, setContent] = useState('daily')
  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    performTasksBasedOnInterval(interval);
  };

  const performTasksBasedOnInterval = (interval) => {
    switch (interval) {
      case 'Daily':
        // Perform tasks for Daily interval
        setContent('daily')
        break;
      case 'Weekly':
        // Perform tasks for Weekly interval
        setContent('Weekly')
        break;
      case 'Monthly':
        // Perform tasks for Monthly interval
        setContent('monthly')
        break;
      case 'Yearly':
        // Perform tasks for Yearly interval
        setContent('Yearly')
        break;
      default:
        // Handle default case if needed
        break;
    }}

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === 'ios'); // For iOS, keep showing until 'Done' is pressed
      setDate(currentDate);
    };

    const showPicker = () => {
      setShowDatePicker(true);
    };



    const openDatePicker = () => {
      setOpen(!open);
    }
    const handleChange = (propDate) => {
      setDate(propDate);
      
      console.log(propDate.getYear);
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TopNavigation Email={email} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button onPress={() => handleIntervalChange('Daily')} title="Daily" />
          <Button onPress={() => handleIntervalChange('Weekly')} title="Weekly" />
          <Button onPress={() => handleIntervalChange('Monthly')} title="Monthly" />
          <Button onPress={() => handleIntervalChange('Yearly')} title="Yearly" />
        </View>
        <View>
          {/* Render content based on the selected interval */}
          {selectedInterval === 'Daily' && 
            <View>
              {/* <Text>{date.getMonth().toString()}</Text> */}
            </View>
            }
          {selectedInterval === 'Weekly' && 
            <Text>{content}</Text>
            }
          {selectedInterval === 'Monthly' && 
            <Text>{content}</Text>
            }
          {selectedInterval === 'Yearly' && 
            <Text>{content}</Text>
            }
        </View>
      </View>
      <View style={{flex:3, alignItems:'center'}}>
        <TouchableOpacity onPress={openDatePicker}>
          <Text>OPEN THIS BOYE</Text>
        </TouchableOpacity>

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
      </View>
      <View>
        <BottomNavigation Email={email} />
      </View>
    </SafeAreaView>
  );
}