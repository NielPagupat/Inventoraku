import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-native-paper'

export default function BottomNavigation({ Navigation }) {
    const[email, setEmail] = useState(Navigation.getParam('Email'))

    const goToPOS = () => {
        Navigation.navigate('POS',{Email:email})
    }
    const goToInventory = () => {
        Navigation.navigate('Inventory',{Email:email})
    }
  return (
    <View style={{width:'100%'}}>
      <Card>
        <Card.Content style={{flexDirection:'row'}}>
                <Button style={{flex:1}}>Profit</Button>
                <Button style={{flex:1}} onPress={goToPOS}>POS</Button>
                <Button style={{flex:1}} onPress={goToInventory}>Inventory</Button>
        </Card.Content>
      </Card>
      
    </View>
  )
}
