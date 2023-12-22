import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput, Button, Avatar } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

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

  return (
    <SafeAreaView style={styles.Content}>
        <Avatar.Image size={100} source={require('../assets/StoreIO_Logo.png')} style={{marginBottom:50, backgroundColor:'rgba(0,0,0,0)'}}/>
        <View style={styles.view}>
            <Card>
                <Card.Title title = "Inventoraku" titleStyle={styles.title}></Card.Title>
                <Card.Content>
                    <TextInput label= "email" keyboardType='email-address'></TextInput>
                    <TextInput label="password" secureTextEntry={pVisibility} style={{marginTop:10}} right={<TextInput.Icon icon={eyeIcon} onPress={showPass}/>}/>
                    <Button style={{alignSelf:'flex-end'}}>Forgot password?</Button>
                    <Button mode='contained'>Log-in</Button>
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