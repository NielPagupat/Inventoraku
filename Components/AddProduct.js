import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavigation from '../NavigationBars/TopNavigation'
import { TextInput, Button} from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios'
import { useNavigation, useRoute } from '@react-navigation/native'
import Link from '../Helpers/API'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
export default function AddProduct() {
    const navigation = useNavigation()
    const route = useRoute()
    const {email, userID} = route.params

    const [Email, setEmail] = useState(email)
    const [UID, setUID] = useState(userID);
    const [productID, setProductID] = useState()
    const [pname, setPname] = useState()
    const [pstock, setPstock] = useState()
    const [PCP, setPCP] = useState()
    const [PRP, setPRP] = useState()
    const [desc, setDesc] = useState()
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShow = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true);
        }
        );
      
        const keyboardDidHide = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);
        }
        );
      
        return () => {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
        };
    }, []);


    const addProduct = async () =>{
        const result = await axios.post(Link('/addProduct'), {
            'UID': UID,
            'PID': productID,
            'Pname': pname,
            'Pstock': pstock,
            'PCP': PCP,
            'PRP': PRP,
            'Desc': desc,
        }, {headers:{'Content-Type': 'application/json'}}).then(function (response){
            if (response.status == 200) {
                alert('Successfull Registration')
            } else {
                alert('registration failed')
            }
        })
        navigation.navigate('Inventory', {Email})
    }
    const [scanned, setScanned] = useState(false);
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setProductID(data)
        alert('okay')
      };
    const reset = () =>{
        setScanned(false)
        setProductID('')
      }

    const backToInventory = () => {
        navigation.navigate('Inventory', {Email})
    }

    
    
      
    

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#FFFBF3'}}>
            <View><TopNavigation val="Inventory" Email={Email} onPress={backToInventory}/></View>
            {!isKeyboardVisible && (
                <View style={{flex:1, marginTop:10}}>  
                <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}/> 
                </View>
            )}

            <View style={{margin:10}}>
                <Text>user ID: {UID}</Text>
                <TextInput underlineColor='transparent' activeUnderlineColor='#987554' style={{marginHorizontal: 5, marginVertical:5, backgroundColor:'#D9D9D9', borderRadius: 5}} label={'Product ID'} value={productID} onChangeText={setProductID} right={<TextInput.Icon icon={'delete'} onPress={reset}/>}/>
                <View style={{flexDirection:'row', marginVertical:5}}>
                    <TextInput underlineColor='transparent' activeUnderlineColor='#987554' style={{flex:3, marginHorizontal:5, backgroundColor:'#D9D9D9', borderRadius: 5}} label={'Product Name'} onChangeText={setPname}/>
                    <TextInput underlineColor='transparent' activeUnderlineColor='#987554' style={{flex:1, marginHorizontal:5, backgroundColor:'#D9D9D9', borderRadius: 5}} label={'Stock'} onChangeText={setPstock}/>
                </View>
                <TextInput underlineColor='transparent' activeUnderlineColor='#987554' style={{marginHorizontal:5, marginVertical:5, backgroundColor:'#D9D9D9', borderRadius: 5}} label={'Description'} onChangeText={setDesc}/>
                <View style={{flexDirection:'row'}}>
                    <TextInput underlineColor='transparent' activeUnderlineColor='#987554' style={{flex:1, marginVertical:5, marginHorizontal:5, backgroundColor:'#D9D9D9', borderRadius: 5}} label={'Capital Price'} onChangeText={setPCP}/>
                    <TextInput underlineColor='transparent' activeUnderlineColor='#987554' style={{flex:1, marginVertical:5, marginHorizontal:5, backgroundColor:'#D9D9D9', borderRadius: 5}} label={'Retail Price'} onChangeText={setPRP}/>
                </View>
                <TouchableOpacity style={{backgroundColor:'#987554', marginHorizontal:5, marginVertical:15, justifyContent:'center', alignItems:'center', alignSelf:'center', height:40, width:'50%', borderRadius:10}} onPress={addProduct}>
                    <Text style={{color:'#F5F5F5'}}>Add Product</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
  )
}