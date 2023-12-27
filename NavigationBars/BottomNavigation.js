import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-native-paper'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

export default function BottomNavigation({ Email }) {
  const navigation = useNavigation()  
  const[email, setEmail] = useState(Email)
    const goToPOS = () => {
        navigation.navigate('POS',{email})
    }
    const goToInventory = async () => {
        const getUserID = await axios.get('http://10.0.254.12:8000/api/getUdata', { params: { 'Email': email } })
        const userID = getUserID.data.userData[0].id
        navigation.navigate('Inventory',{email, userID})
        
    }

    const goToProfit = () =>{
      console.log(email)
    }
  return (
    <View style={{width:'100%'}}>
      <Card>
        <Card.Content style={{flexDirection:'row'}}>
                <Button style={{flex:1}} onPress={goToProfit}>Profit</Button>
                <Button style={{flex:1}} onPress={goToPOS}>POS</Button>
                <Button style={{flex:1}} onPress={goToInventory}>Inventory</Button>
        </Card.Content>
      </Card>
      
    </View>
  )
}
