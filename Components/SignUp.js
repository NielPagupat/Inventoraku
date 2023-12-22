import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, View } from "react-native";
import { Avatar, Button, Card, Text, TextInput} from "react-native-paper";

export default function SignUp() {
    return (
        <SafeAreaView style={styles.Content}>
            <Avatar.Image size={100} source={require('../assets/StoreIO_Logo.png')} style={{marginBottom: 20, backgroundColor:'rgba(0,0,0,0)'}}/>
            <View style={styles.view}>
                <Card>
                <Card.Content>
                    <View style={{alignItems: 'center'}}>
                        <Text>Sign-Up</Text>
                    </View>
                    <View>
                        <View style={styles.inputBoxes}>
                            <Text>E-mail</Text>
                            <TextInput mode="outlined" style={styles.textInputs}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <Text>Password</Text>
                            <TextInput mode="outlined" style={styles.textInputs}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <Text>Re-enter Password</Text>
                            <TextInput mode="outlined" style={styles.textInputs}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <Text>Last Name</Text>
                            <TextInput mode="outlined" style={styles.textInputs}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 3}}>
                                <Text>First Name</Text>
                                <TextInput mode="outlined" style={{height: 35}}/>
                            </View>
                            <View style={{flex: .1}}></View>
                            <View style={{flex: 1}}>
                                <Text>M.I.</Text>
                                <TextInput mode="outlined" style={{height: 35}}/>
                            </View>
                        </View>
                        <View style={styles.inputBoxes}>
                            <Text>Address</Text>
                            <TextInput mode="outlined" style={styles.textInputs}/>
                        </View>
                        <View style={{alignItems:'center', marginTop: 20}}>
                            <Button mode="elevated" style={{width: '65%',}}> Next </Button>
                        </View>
                    </View>
                </Card.Content>
                </Card>
            </View>    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Content: {
        flex:1,
        alignItems: 'center',
    },
    view: {
        width: '80%'
    },
    textInputs: {
        height: 35,
        width: '100%'
    },
    inputBoxes: {
        marginTop: 10
    }
})