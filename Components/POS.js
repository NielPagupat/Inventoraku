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
import axios from 'axios'
export default function POS() {
    const navigation = useNavigation()
    const route = useRoute()
    const {email} = route.params
    const {userID} = route.params
    const [total, setTotal] = useState('0');
    
    const [code, setCode] = useState('')
    const [multiplier, setMultiplier] = useState('1')
    const [isActiveBarcodeSearch, setBarcodeSearch] = useState(false)
    const [isActiveMultiplier, setActiveMultiplier] = useState(false)
    const [clicked, setClick] = useState('#987554')
    const [mclicked, setMclicked] = useState('#987554')
    
    const [productSold, setProductSold] = useState([])

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
        console.log(productSold)
      }

      
      
      const numpadInput = (value) => {
        if (isActiveBarcodeSearch == true) {
          setCode(code+value)
        }
        if (isActiveMultiplier == true) {
          setMultiplier(multiplier+value)
        }
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
          <TextInput theme={{colors: {text: '#39FF14'}}} style={{textAlign:"right", width:'97%', marginVertical:5, backgroundColor:'#212427'}} value={total} readOnly/>
        </View>
        <View style={{backgroundColor:'red', flex:1}}>
            <Card style={{flex:1, backgroundColor:'grey'}}>
                <Card.Content style={{flexDirection:'row', backgroundColor:'#FFFBF3', height:'100%'}}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'center'}}>
                        <View style={{flex:2.20, justifyContent:'center'}}>
                            <View style={{flexDirection:'row'}}>
                              <TextInput label='barcode number' style={{flex:1}} readOnly value={code}/>
                              <TextInput label='multiplier' readOnly value={multiplier}/>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(1)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(2)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(3)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>3</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(4)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>4</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(5)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>5</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(6)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>6</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2}}>
                                <TouchableOpacity onPress={()=>numpadInput(7)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>7</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(8)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>8</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>numpadInput(9)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:80, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>9</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row', margin:2, alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>numpadInput(0)} style={{backgroundColor:'#CDCEC9', marginHorizontal:2, width:164, height:35, alignItems:'center', borderRadius: 5}}>
                                  <Text>0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection:'row', marginHorizontal:2, alignItems:'center', backgroundColor:'#E5D3B3', width:80, height:35, borderRadius:5, justifyContent:'space-evenly'}} onPress={reset}>
                                  <FontAwesomeIcon style={{transform:[{rotate: '90deg'}], color:'#212427'}} icon={faTurnUp} />
                                  <Text style={{color:'#212427'}}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, justifyContent:'space-around', alignItems:'center'}}>
                            <TouchableOpacity style={{flexDirection:'row', backgroundColor:clicked, width:125, height:50, borderRadius:5, alignItems:'center', justifyContent:'space-evenly'}} mode='contained' onPress={getBarcode}>
                              <FontAwesomeIcon style={{color:'#F5F5F5'}} icon={faBarcode}/>
                              <View style={{alignContent:'flex-start', width:55}}>
                                <Text style={{color:'#F5F5F5'}}>Barcode</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', backgroundColor:mclicked, width:125, height:50, borderRadius:5, alignItems:'center', justifyContent:'space-evenly'}} mode='contained' onPress={multiplierStatus}>
                              <FontAwesomeIcon style={{color:'#F5F5F5'}} icon={faX}/>
                              <View style={{alignContent:'flex-start', width:55}}>
                                <Text style={{color:'#F5F5F5'}}>Multiply</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', backgroundColor:'#987554', width:125, height:50, borderRadius:5, alignItems:'center', justifyContent:'space-evenly'}} mode='contained' onPress={clear}>
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