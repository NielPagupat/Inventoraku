import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Card, Button, Icon, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'


export default function TopNavigation({Email}) {
    const navigation = useNavigation()
    const [email, setEmail] = useState(Email)
    const Logout = () =>{
      navigation.navigate('Login')
    }
    const goToHome = () => {
      navigation.navigate('Dashboard', {email})
    }
  return (
    <View style={{width:'100%'}}>
      <Card>
        <Card.Content style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
                <Button icon='chevron-left' onPress={Logout}>Logout</Button>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                <Text style={{marginRight:50}} onPress={goToHome}>{email}</Text>
                <Avatar.Image size={50}/>
            </View>
        </Card.Content>
      </Card>
    </View>
  )
}