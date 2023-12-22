import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Card } from 'react-native-paper'

export default function BottomNavigation({ Navigation }) {
    const goToPOS = () => {
        Navigation.navigate('POS')
    }
  return (
    <View style={{width:'100%'}}>
      <Card>
        <Card.Content style={{flexDirection:'row'}}>
                <Button style={{flex:1}}>Profit</Button>
                <Button style={{flex:1}} onPress={goToPOS}>POS</Button>
                <Button style={{flex:1}}>Inventory</Button>
        </Card.Content>
      </Card>
      
    </View>
  )
}
