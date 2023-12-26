import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Portal, Text, TextInput, Modal, RadioButton} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
export default function SignUp({ navigation }) {
    const [visible, SetVisible] = useState(false);

    const showModal = () => SetVisible(true);
    const hideModal = () => SetVisible(false);
    const containerStyle = {backgroundColor: '#987554', height: 450, margin: 40, borderRadius: 10};
    
    const backToLogin = () => {
        navigation.goBack();
    }


    const [email, setEmail] = useState();
    const [passwd, setPasswd] = useState();
    const [passwdConfirm, setPasswdConfirm] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [mi, setMI] = useState();
    const [address, setAddress] = useState();
    const [bname, setBname] = useState();
    const [baddress, setBaddress] = useState();
    const [payOpt, setPayopt] = useState();
    const [ownType, setOwntype] = useState();

    const register = async () => {
        const reg = await axios.post('http://10.0.254.12:8000/api/register')

        alert(reg.data.status)
    }

    const [checked, setChecked] = React.useState('');


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
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="E-mail"/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Password"/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Re-enter Password"/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Last Name"/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 3}}>
                                <TextInput selectionColor='black' activeUnderlineColor="black" style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} label="First Name"/>
                            </View>
                            <View style={{flex: .1}}></View>
                            <View style={{flex: 1}}>
                                <TextInput selectionColor='black' activeUnderlineColor="black" style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} label="M.I."/>
                            </View>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Address"/>
                        </View>
                        <View style={{flexDirection: "row", justifyContent:'space-between', marginTop: 20}}>
                            <Button textColor="white" onPress={backToLogin}> Back </Button>
                            <Button mode="elevated" textColor="black" style={{width: '65%',}} onPress={showModal}> Next </Button>
                        </View>
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'flex-start', marginBottom: 10}}>
                                    <Button textColor='white'style={{marginHorizontal:10}} onPress={hideModal}>
                                        <Icon color={'white'} name="arrow-left" size={20}/>
                                    </Button>
                                </View>
                                <View>
                                    <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.modalInputs} label="Business Name"/>
                                </View>
                                <View>
                                    <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.modalInputs} label="Business Address"/>
                                </View>
                                <View>
                                    <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.modalInputs} label="Business Permit Number"/>
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color: 'white'}}>Payment Option</Text>
                                    <TextInput activeUnderlineColor="black" style={{height: 35, marginTop: 10, marginHorizontal:10, width:'45%', backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10}}/>
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center', marginTop: 10, marginLeft:30}}> 
                                    <Text style={{color: 'white'}}>Ownership Type</Text>
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'center'}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{color:'white'}}>Retailer</Text>
                                        <RadioButton
                                                value="first"
                                                color="#E5D3B3"
                                                status={ checked === 'first' ? 'checked' : 'unchecked' }
                                                onPress={() => setChecked('first')}
                                            />
                                    </View>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{color:'white'}}>Supplier</Text>
                                        <RadioButton
                                            value="second"
                                            color="#E5D3B3"
                                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                                            onPress={() => setChecked('second')}
                                        />
                                    </View>
                                    
                                </View>
                                <View style={{alignItems:'center', marginTop: 20}}>
                                    <Button mode="elevated" textColor="black" style={{width: '50%'}}>Submit</Button>
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
        backgroundColor:'white',
        width: '100%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10,
        height: 50
    },
    inputBoxes: {
        marginTop: 10,
    },
    modalInputs: {
        marginHorizontal: 20,
        marginTop: 5,
        backgroundColor: 'white',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10
    }
})