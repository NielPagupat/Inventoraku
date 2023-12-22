import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput, Button, Avatar, useTheme } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import axios from 'axios'

export default function Login({ navigation }) {
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
        const result = await axios.get('http://10.0.254.12:8000/api/login', {
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
            } else {
                console.log('invalid password')
            }
        }
        
        
        
    }
    
  return (
    <SafeAreaView style={styles.Content}>
        <Avatar.Image size={100} source={require('../assets/StoreIO_Logo.png')} style={{marginBottom:50, backgroundColor:'rgba(0,0,0,0)'}}/>
        <View style={styles.view}>
            <Card>
                <Card.Title title = "Inventoraku" titleStyle={styles.title}></Card.Title>
                <Card.Content>
                    <TextInput label= "email" keyboardType='email-address' onChangeText={setEmail}></TextInput>
                    <TextInput label="password" secureTextEntry={pVisibility} style={{marginTop:10}} onChangeText={setPassword} right={<TextInput.Icon icon={eyeIcon} onPress={showPass}/>}/>
                    <Button style={{alignSelf:'flex-end'}}>Forgot password?</Button>
                    <Button mode='contained' onPress={logIn}>Log-in</Button>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text>Don't have an account?</Text>
                        <Button onPress={toSignUp}>Sign-up</Button>
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
    },
    view:{
        width:'80%'
    },
    title:{
        alignSelf:'center'
    }
})