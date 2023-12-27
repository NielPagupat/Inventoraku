import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNavigation from '../NavigationBars/TopNavigation'
import { TextInput, Button} from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios'
export default function AddProduct({navigation}) {
    const [email, setEmail] = useState(navigation.getParam('Email'))
    const [UID, setUID] = useState(navigation.getParam('Userid'));
    const [productID, setProductID] = useState()
    const [pname, setPname] = useState()
    const [pstock, setPstock] = useState()
    const [PCP, setPCP] = useState()
    const [PRP, setPRP] = useState()
    const [desc, setDesc] = useState()



    const addProduct = async () =>{
        const result = await axios.post('http://10.0.254.12:8000/api/addProduct', {
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
    return (
        <SafeAreaView style={{flex:1}}>
            <View><TopNavigation Navigation={navigation}/></View>
            <View style={{flex:1}}>
                <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}/>
            </View>
            <View>
                <Text>user ID: {UID}</Text>
                <TextInput label={'Product ID'} value={productID} right={<TextInput.Icon icon={'undo'} onPress={reset}/>}/>
                <TextInput label={'Product Name'} onChangeText={setPname}/>
                <TextInput label={'Product Stock'} onChangeText={setPstock}/>
                <TextInput label={'Product Capital Price'} onChangeText={setPCP}/>
                <TextInput label={'Product Retail Price'} onChangeText={setPRP}/>
                <TextInput label={'Description'} onChangeText={setDesc}/>
                <Button onPress={addProduct}>Submit</Button>
            </View>
        </SafeAreaView>
  )
}