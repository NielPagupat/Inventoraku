import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import TopNavigation from '../NavigationBars/TopNavigation';
import BottomNavigation from '../NavigationBars/BottomNavigation';

export default function Profit() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [date, setDate] = useState(new Date())
  const [selectedInterval, setSelectedInterval] = useState('Daily');

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
              <Text>{date.getMonth().toString()}</Text>
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
      <View>
        <BottomNavigation Email={email} />
      </View>
    </SafeAreaView>
  );
}