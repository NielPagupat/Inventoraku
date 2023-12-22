import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Button, TextInput} from 'react-native-paper'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import TopNavigation from '../NavigationBars/TopNavigation'
export default function POS() {
    const [total, setTotal] = useState('0');
    const add = () => {
        let number = parseInt(total)
        let data = number + 1
        setTotal(data.toString())
    }
  return (
    <SafeAreaView style={{flex:1}}>
        <View><TopNavigation /></View>
        <View style={{flex:2, justifyContent:'center', alignItems:'center'}}><Text>Scanner Here</Text></View>
        <View><TextInput style={{textAlign:"right"}} value={total} readOnly/></View>
        <View style={{backgroundColor:'red', flex:1}}>
            <Card style={{flex:1, backgroundColor:'grey'}}>
                <Card.Content style={{flexDirection:'row', backgroundColor:'white', height:'100%'}}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'center'}}>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row', flex:1,}}>
                                <Button style={{flex:1}} onPress={add}>1</Button>
                                <Button style={{flex:1}}>2</Button>
                                <Button style={{flex:1}}>3</Button>
                            </View>
                            <View style={{flexDirection:'row', flex:1}}>
                                <Button style={{flex:1}}>4</Button>
                                <Button style={{flex:1}}>5</Button>
                                <Button style={{flex:1}}>6</Button>
                            </View>
                            <View style={{flexDirection:'row', flex:1}}>
                                <Button style={{flex:1}}>7</Button>
                                <Button style={{flex:1}}>8</Button>
                                <Button style={{flex:1}}>9</Button>
                            </View>
                            <View>
                                <Button>0</Button>
                            </View>
                        </View>
                        <View style={{justifyContent:'space-around'}}>
                            <Button mode='contained'><Icon name='arrow-right'/>next</Button>
                            <Button mode='contained'><Icon name='barcode'/> Code</Button>
                            <Button mode='contained'>X multiply</Button>
                            <Button mode='contained'>$ finish</Button>

                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
        <View>
            <BottomNavigation />
        </View>
    </SafeAreaView>
  )
}