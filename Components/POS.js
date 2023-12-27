import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Button, TextInput} from 'react-native-paper'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import TopNavigation from '../NavigationBars/TopNavigation'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native'

export default function POS() {
    const navigation = useNavigation()
    const route = useRoute()
    const {email} = route.params
    const [total, setTotal] = useState('0');
    const [productID, setProductID] = useState();
    const add = () => {
        let number = parseInt(total)
        let data = number + 1
        setTotal(data.toString())
    }

    //Barcode Scanner
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []); 

      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setProductID(data)
        alert('okay')
      };

      const reset = () =>{
        setScanned(false)
        setProductID('')
      }
      const showData = () =>{
        alert(productID)
      }
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

    
  return (
    <SafeAreaView style={{flex:1}}>
        <View><TopNavigation Email={email}/></View>
        <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
            <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}/>
                     
        </View>
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
                            <Button mode='contained' onPress={reset}><Icon name='arrow-right'/>next</Button>
                            <Button mode='contained' onPress={showData}><Icon name='barcode'/> Code</Button>
                            <Button mode='contained'>X multiply</Button>
                            <Button mode='contained'>$ finish</Button>

                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
        <View>
            <BottomNavigation Email={email}/>
        </View>
    </SafeAreaView>
  )
}