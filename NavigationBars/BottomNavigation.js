import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-native-paper'
import axios from 'axios'

export default function BottomNavigation({ Navigation}) {
    const[email, setEmail] = useState(Navigation.getParam('Email'))
    const goToPOS = () => {
        Navigation.navigate('POS',{Email:email})
    }
    const goToInventory = async () => {
        const getUserID = await axios.get('http://10.0.254.12:8000/api/getUdata', { params: { 'Email': email } })

        Navigation.navigate('Inventory',{Email:email, Userid:getUserID.data.userData[0].id})
        
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
