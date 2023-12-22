import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Card, Button, Icon, Avatar } from 'react-native-paper'


export default function TopNavigation() {
    
  return (
    <View style={{width:'100%'}}>
      <Card>
        <Card.Content style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center'}}>
                <Button icon='chevron-left'>Logout</Button>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                <Text style={{marginRight:50}}>Home</Text>
                <Avatar.Image size={50}/>
            </View>
        </Card.Content>
      </Card>
    </View>
  )
}