import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Portal, Text, TextInput, Modal} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignUp({ navigation }) {
    const [visible, SetVisible] = useState(false);

    const showModal = () => SetVisible(true);
    const hideModal = () => SetVisible(false);
    const containerStyle = {backgroundColor: 'white', height: '45%', margin: 40, borderRadius: 10};
    
    const backToLogin = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.Content}>
            <Avatar.Image size={100} source={require('../assets/StoreIO_Logo.png')} style={{marginBottom: 20, backgroundColor:'rgba(0,0,0,0)'}}/>
            <View style={styles.view}>
                <Card style={{backgroundColor:'#987554'}}>
                <Card.Content>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color:'white', fontSize:20}}>Sign-Up</Text>
                    </View>
                    <View>
                        <View style={styles.inputBoxes}>
                            <TextInput mode="outlined" style={styles.textInputs} label="E-mail"/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput mode="outlined" style={styles.textInputs} label="Password"/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput mode="outlined" style={styles.textInputs} label="Re-enter Password"/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput mode="outlined" style={styles.textInputs} label="Last Name"/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 3}}>
                                <TextInput mode="outlined" style={{height: 35}} label="First Name"/>
                            </View>
                            <View style={{flex: .1}}></View>
                            <View style={{flex: 1}}>
                                <TextInput mode="outlined" style={{height: 35}} label="M.I."/>
                            </View>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput mode="outlined" style={styles.textInputs} label="Address"/>
                        </View>
                        <View style={{flexDirection: "row", justifyContent:'space-between', marginTop: 20}}>
                            <Button onPress={backToLogin}> Back </Button>
                            <Button mode="elevated" style={{width: '65%',}} onPress={showModal}> Next </Button>
                        </View>
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'flex-start'}}>
                                    <Button>
                                        <Icon name="arrow-left" size={20}/>
                                    </Button>
                                </View>
                                <View>
                                    <TextInput mode="outlined" style={styles.modalInputs} label="Business Name"/>
                                </View>
                                <View>
                                    <TextInput mode="outlined" style={styles.modalInputs} label="Business Address"/>
                                </View>
                                <View>
                                    <TextInput mode="outlined" style={styles.modalInputs} label="Business Permit Number"/>
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Text>Payment Option</Text>
                                    <TextInput mode="outlined" style={{height: 35, marginTop: 10, marginHorizontal:10, width:'45%'}}/>
                                </View>
                                <View style={{alignItems:'center', marginTop: 30}}>
                                    <Button mode="contained" style={{width: '50%'}}>Submit</Button>
                                </View>
                            </Modal>
                        </Portal>
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
        justifyContent: 'center',
        backgroundColor: '#E5D3B3'
        
    },
    view: {
        width: '80%',
    },
    textInputs: {
        height: 35,
        width: '100%'
    },
    inputBoxes: {
        marginTop: 10,
    },
    modalInputs: {
        marginHorizontal: 20,
        height: 35,
        marginTop: 5
    }
})