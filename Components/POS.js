import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Button, TextInput} from 'react-native-paper'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import TopNavigation from '../NavigationBars/TopNavigation'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Link from '../Helpers/API'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { faBarcode, faRightFromBracket, faRightToBracket, faTurnUp, faX } from '@fortawesome/free-solid-svg-icons'
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
        <View style={{backgroundColor:'#E5D3B3', alignItems:'center'}}>
          <TextInput style={{textAlign:"right", width:'97%', marginVertical:5, backgroundColor:'#212427', color:"#39FF14"}} value={total} readOnly/>
        </View>
        <View style={{backgroundColor:'red', flex:1}}>
            <Card style={{flex:1, backgroundColor:'grey'}}>
                <Card.Content style={{flexDirection:'row', backgroundColor:'#FFFBF3', height:'100%'}}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'center'}}>
                        <View style={{flex:2.20, justifyContent:'center'}}>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}} onPress={add}>
                                  <Text>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>3</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>6</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>9</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2, alignItems:'center'}}>
                                <TouchableOpacity style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:164, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection:'row', marginHorizontal:2, alignItems:'center', backgroundColor:'#E5D3B3', width:80, height:35, borderRadius:5, justifyContent:'space-evenly'}} onPress={reset}>
                                  <FontAwesomeIcon style={{transform:[{rotate: '90deg'}], color:'#212427'}} icon={faTurnUp} />
                                  <Text style={{color:'#212427'}}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, justifyContent:'space-around', alignItems:'center'}}>
                            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#987554', width:125, height:50, borderRadius:5, alignItems:'center', justifyContent:'space-evenly'}} mode='contained' onPress={showData}>
                              <FontAwesomeIcon style={{color:'#F5F5F5'}} icon={faBarcode}/>
                              <View style={{alignContent:'flex-start', width:55}}>
                                <Text style={{color:'#F5F5F5'}}>Barcode</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#987554', width:125, height:50, borderRadius:5, alignItems:'center', justifyContent:'space-evenly'}} mode='contained'>
                              <FontAwesomeIcon style={{color:'#F5F5F5'}} icon={faX}/>
                              <View style={{alignContent:'flex-start', width:55}}>
                                <Text style={{color:'#F5F5F5'}}>Multiply</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#987554', width:125, height:50, borderRadius:5, alignItems:'center', justifyContent:'space-evenly'}} mode='contained'>
                              <FontAwesomeIcon style={{color:'#F5F5F5'}} icon={faRightFromBracket}/>
                              <View style={{alignContent:'flex-start', width:55}}>
                                <Text style={{color:'#F5F5F5'}}>Finish</Text>
                              </View>
                            </TouchableOpacity>
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