import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput, Button } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

export default function Login() {
  return (
    <SafeAreaView style={styles.Content}>
        <View style={styles.view}>
            <Card>
                <Card.Title title = "Inventoraku" titleStyle={styles.title}></Card.Title>
                <Card.Content>
                    <TextInput label= "email" keyboardType='email-address'></TextInput>
                    <TextInput label="password" secureTextEntry={true}></TextInput>
                    <Button>Forgot password?</Button>
                    <Button mode='contained'>Log-in</Button>
                    <Button>Sign-up</Button>
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
        flexDirection:'row',
    },
    view:{
        width:'80%'
    },
    title:{
        alignSelf:'center'
    }
})