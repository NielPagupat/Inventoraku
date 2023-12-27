import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Card, Button, Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TopNavigation({Navigation}) {

    const [email, setEmail] = useState(Navigation.getParam('Email'))
    const Logout = () =>{
      Navigation.navigate('Login')
    }
    const goToHome = () => {
      Navigation.navigate('Dashboard')
    }
  return (
    <View style={{width:'95%', alignSelf:'center', marginTop:10}}>
      <Card style={{backgroundColor:'#E5D3B3'}}>
        <Card.Content style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', width:75}} onPress={Logout}>
            <Icon style={{textShadowColor:'gray', textShadowRadius: 5}} color={'#6C442D'} name='chevron-left' size={20}/>
            <Text style={{color:'#6C442D', textShadowColor:'gray', textShadowRadius:5}}>Log-out</Text>
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