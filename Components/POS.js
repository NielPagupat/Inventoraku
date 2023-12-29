import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Button, TextInput, Portal, Modal} from 'react-native-paper'
import BottomNavigation from '../NavigationBars/BottomNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import TopNavigation from '../NavigationBars/TopNavigation'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Link from '../Helpers/API'
import { faBarcode, faRightFromBracket, faRightToBracket, faTurnUp, faX } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export default function POS() {
    const navigation = useNavigation()
    const route = useRoute()
    const {email} = route.params
    const {userID} = route.params
    const [total, setTotal] = useState('0');
    const [bcNum, setBcNum] = useState('');
    
    const [code, setCode] = useState('')
    const [multiplier, setMultiplier] = useState('1')
    const [isActiveBarcodeSearch, setBarcodeSearch] = useState(false)
    const [isActiveMultiplier, setActiveMultiplier] = useState(false)
    
    const [productSold, setProductSold] = useState([])

    const [barcodeVisible, SetBarcodeVisible] = useState(false);
    const [multiplyVisible, SetMultiplyVisible] = useState(false);

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

      const handleBarCodeScanned = async ({ type, data }) => {
        setCode(data)
        const result = await axios.get(Link('/getPrice'), {params:{
          'PID': data,
          'UID': userID
        }})
        // Add product to sold list 
        const arr = productSold
        const value =  parseInt(total) + parseInt(result.data.price[0].retail_price)
        setTotal(value.toString())
        setScanned(true)

        arr.push({
          "PID": code,
          "UID": userID,
          "Price": result.data.price[0].retail_price,
          "Quantity": multiplier,
        })

        setProductSold(arr)
      
      };

      const reset = async() =>{
        const result = await axios.get(Link('/getPrice'), {params:{
          'PID': code,
          'UID': userID
        }})
        if (isActiveBarcodeSearch == true) {
          const productprice = result.data.price[0].retail_price
          console.log(result.data)
          if (isActiveMultiplier == true) {
            const product = parseInt(productprice)*parseInt(multiplier)
            const value = parseInt(total) + parseInt(product)
            setTotal(value.toString())
            setScanned(true)
            setActiveMultiplier(false)
          } else {
            const value =  parseInt(total) + parseInt(result.data.price[0].retail_price)
            setTotal(value.toString())
            setScanned(true)
          }
        } else {
          setScanned(false)
        }
        
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

      const clear = () => {
        setTotal('0')
        setCode('')
        setMultiplier('')
      }

      const numpadInput = (value) => {
        if (isActiveBarcodeSearch == true) {
          setCode(code+value)
        }
        if (isActiveMultiplier == true) {
          setMultiplier(multiplier+value)
        }
      }
     
    const showBarcodeModal = () => {
      SetBarcodeVisible(true);
      setBarcodeSearch(true);
    }
    const hideBarcodeModal = () => {
      SetBarcodeVisible(false);
      setBarcodeSearch(false);
    }
    const barcodeContainerStyle = {backgroundColor: '#987554', height: 370, margin: 40, borderRadius: 10, padding:10};

    const showMultiplyModal = () => {
      SetMultiplyVisible(true);
      setActiveMultiplier(true);
    }
    const hideMultiplyModal = () => {
      SetMultiplyVisible(false);
      setActiveMultiplier(false);
    }
    const multiplyContainerStyle = {backgroundColor: '#987554', height: 370, margin: 40, borderRadius: 10, padding:10};

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FFFBF3'}}>
        <View><TopNavigation Email={email}/></View>
        <View style={{flex:2, justifyContent:'center', alignItems:'center', marginVertical:10}}>
            <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}/>
                     
        </View>
        <View style={{backgroundColor:'#E5D3B3', alignItems:'center'}}>
          <TextInput style={{textAlign:"right", width:'97%', marginVertical:5, backgroundColor:'#F5F5F5'}} underlineColor='transparent' value={total} editable={false}/>
        </View>
        <View style={{flex:1}}>
            <Card style={{flex:1}}>
                <Card.Content style={{flexDirection:'row', backgroundColor:'#FFFBF3', height:'100%'}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <View style={{flex:3, flexDirection:'row', justifyContent:'center'}}>
                            <View style={{flex:3, marginBottom:5, borderRadius:5, backgroundColor:'#D9D9D9'}}>
                              <Text>PENIS</Text>
                            </View>
                            <View style={{flex:2, marginBottom:5, justifyContent:'space-around'}}>
                              <TextInput style={{height:50, marginLeft:5, borderRadius:5, backgroundColor:'#D9D9D9'}} placeholder='Barcode #' underlineColor='transparent' readOnly value={code}/>
                              <TextInput style={{height:50, marginLeft:5, borderRadius:5, backgroundColor:'#D9D9D9'}} placeholder='Multiplier' underlineColor='transparent' readOnly value={multiplier}/>
                            </View>
                        </View>
                        
                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                            <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor:'#987554', height:35, borderRadius:5, alignItems:'center', justifyContent:'space-evenly', marginHorizontal:2}} onPress={showBarcodeModal}>
                              <FontAwesomeIcon style={{color:'#F5F5F5'}} icon={faBarcode}/>
                              <Text style={{color:'#F5F5F5'}}>Barcode</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor:'#987554', height:35, borderRadius:5, alignItems:'center', justifyContent:'space-evenly', marginHorizontal:2}} onPress={showMultiplyModal}>
                              <FontAwesomeIcon style={{color:'#F5F5F5'}} icon={faX}/>
                              <Text style={{color:'#F5F5F5'}}>Multiply</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor:'#987554', height:35, borderRadius:5, alignItems:'center', justifyContent:'space-evenly', marginHorizontal:2}} onPress={clear}>
                              <FontAwesomeIcon style={{transform:[{rotate: '90deg'}], color:'#F5F5F5'}} icon={faTurnUp} />
                              <Text style={{color:'#F5F5F5'}}>Next</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor:'#E5D3B3', height:35, borderRadius:5, alignItems:'center', justifyContent:'space-evenly', marginHorizontal:2}} onPress={clear}>
                              <FontAwesomeIcon style={{color:'#212427'}} icon={faRightFromBracket}/>
                              <Text style={{color:'#212427', fontWeight:'bold'}}>Finish</Text>
                            </TouchableOpacity>
                          </View>

                          <Portal>
                            <Modal visible={barcodeVisible} onDismiss={hideBarcodeModal} contentContainerStyle={barcodeContainerStyle}>
                              <TouchableOpacity onPress={hideBarcodeModal}>
                                <FontAwesomeIcon style={{color:'#f5f5f5', marginBottom:10, marginRight:10, alignSelf:'flex-end'}} size={25} icon={faX} />
                              </TouchableOpacity>
                              <TextInput style={{marginVertical:4, marginHorizontal:6, borderRadius:5}} underlineColor='transparent' editable={false} value={code}/>
                              <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(1)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(2)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(3)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>3</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(4)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(5)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(6)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>6</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(7)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(8)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(9)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>9</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2, alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>numpadInput(0)} style={{flex:2.05, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection:'row', marginHorizontal:2, alignItems:'center', flex:1, backgroundColor:'#E5D3B3', height:50, borderRadius:5, justifyContent:'space-evenly'}} onPress={hideBarcodeModal}>
                                  <FontAwesomeIcon style={{transform:[{rotate: '90deg'}], color:'#212427'}} icon={faTurnUp} />
                                  <Text style={{color:'#212427', fontWeight:'bold'}}>OK</Text>
                                </TouchableOpacity>
                            </View>
                            </Modal>
                          </Portal>

                          <Portal>
                            <Modal visible={multiplyVisible} onDismiss={hideMultiplyModal} contentContainerStyle={multiplyContainerStyle}>
                              <TouchableOpacity onPress={hideMultiplyModal}>
                                <FontAwesomeIcon style={{color:'#f5f5f5', marginBottom:10, marginRight:10, alignSelf:'flex-end'}} size={25} icon={faX} />
                              </TouchableOpacity>
                              <TextInput style={{marginVertical:4, marginHorizontal:6, borderRadius:5}} underlineColor='transparent' editable={false} value={multiplier}/>
                              <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(1)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(2)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(3)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>3</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(4)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(5)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(6)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>6</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(7)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(8)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(9)} style={{flex:1, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>9</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2, alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>numpadInput(0)} style={{flex:2.05, backgroundColor:'#CDCEC9', marginHorizontal:2, height:50, alignItems:'center', borderRadius: 5}}>
                                  <Text>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection:'row', marginHorizontal:2, alignItems:'center', flex:1, backgroundColor:'#E5D3B3', height:50, borderRadius:5, justifyContent:'space-evenly'}} onPress={hideBarcodeModal}>
                                  <FontAwesomeIcon style={{transform:[{rotate: '90deg'}], color:'#212427'}} icon={faTurnUp} />
                                  <Text style={{color:'#212427', fontWeight:'bold'}}>OK</Text>
                                </TouchableOpacity>
                            </View>
                            </Modal>
                          </Portal>
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