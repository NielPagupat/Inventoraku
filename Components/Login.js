import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput, Button, Avatar, useTheme } from 'react-native-paper'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Link from '../Helpers/API'

export default function Login() {
    const navigation = useNavigation()

    const [pVisibility, setPVisibility] = useState(true)
    const [eyeIcon, setIcon] = useState('eye-off')
    const showPass = () => {
        if (pVisibility == true) {
            setPVisibility(false)
            setIcon('eye')
        } else {
            setPVisibility(true)
            setIcon('eye-off')
        }
    }

    const toSignUp = () => {
        navigation.navigate('SignUp')
    }

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const logIn = async () => {
        const result = await axios.get(Link('/login'), {
            params:{
                "Email": email,
                "Password": password
            }  
        })
        if (result.data.match == false) {
            console.log('invalid email') 
        } else {
            if (password == result.data.password[0].password) {
                console.log('logged in')
                // const Email = email
                navigation.navigate('Dashboard',{ email })
            } else {
                console.log('invalid password')
            }
        }     
        

    }

  return (
    <SafeAreaView style={styles.Content}>
        <View style={{marginBottom: 50, alignItems:'center'}}>
            <Avatar.Image size={200} source={require('../assets/StoreIO_Logo.png')} style={{backgroundColor:'rgba(0,0,0,0)', marginLeft:5}}/>
            <Text style={{fontSize: 30}}>Inventoraku</Text>
        </View>
        <View style={styles.view}>
            <Card style={{backgroundColor:'#987554'}}>
                <Card.Content>
                    <TextInput style={{backgroundColor:'white'}} label="E-mail" activeUnderlineColor='#987554' keyboardType='email-address' onChangeText={setEmail}></TextInput>
                    <TextInput style={{marginTop:10, backgroundColor:'white'}} label="Password" activeUnderlineColor='#987554' secureTextEntry={pVisibility}  onChangeText={setPassword} right={<TextInput.Icon icon={eyeIcon} onPress={showPass}/>}/>
                    <Button textColor='white' style={{alignSelf:'flex-end'}}>Forgot Password?</Button>
                    <Button buttonColor='#E5D3B3' textColor='black' mode='contained' onPress={logIn}>Log-in</Button>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop: 10}}>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text style={{color:'white', margin: 10, fontWeight:'bold'}} onPress={toSignUp}>Sign-up</Text>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </View>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    Content:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#E5D3B3'
    },
    view:{
        width:'80%'
    },
})