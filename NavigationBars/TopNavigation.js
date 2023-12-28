import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Card, Button, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';

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
    <View style={{width:'95%', alignSelf:'center', marginTop:10}}>
      <Card style={{backgroundColor:'#E5D3B3'}}>
        <Card.Content style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', width:75}} onPress={Logout}>
            <Icon color={'#6C442D'} name='chevron-left' size={20}/>
            <Text style={{color:'#6C442D'}}>Log-out</Text>
          </TouchableOpacity>
            <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                <Text style={{marginRight:50}} onPress={goToHome}>{email}</Text>
                <Avatar.Image elevation={10} size={50} source={require('../assets/Profile_Pic.jpg')}/>
            </View>
        </Card.Content>
      </Card>
    </View>
  )
}