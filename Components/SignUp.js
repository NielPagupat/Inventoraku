import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Portal, Text, TextInput, Modal, RadioButton} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios, { AxiosHeaders } from "axios";

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
    const [bpermit, setBpermit] = useState();
    const [payOpt, setPayopt] = useState();
    const [ownType, setOwntype] = useState();

    const register = async () => {
        
        const reg = await axios.post('http://10.0.254.12:8000/api/register', {
            "Email": email,
            "Password": passwd,
            "Fname": fname,
            "Lname": lname,
            "MI": mi,
            "Addr": address,
            "Bname": bname,
            "Baddress": baddress,
            "Payopt": payOpt,
            "OwnType": ownType,
            "Bpermit": bpermit
        }, {headers:{'Content-Type': 'application/json'}}).then(function (response){
            if (response.status == 200) {
                alert('Successfull Registration')
            } else {
                alert('registration failed')
            }
        })
    }

    const submitData = () => {
        console.log({
            "email": email,
            "password": passwd,
            "fname": fname,
            "lname": lname,
            "mi": mi,
            "addr": address,
            "bname": bname,
            "baddress": baddress,
            "PayOpt": payOpt,
            "ownType": ownType,
            "bpermit": bpermit
        })
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
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="E-mail" onChangeText={setEmail}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Password" onChangeText={setPasswd}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Re-enter Password" onChangeText={setPasswdConfirm}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Last Name" onChangeText={setLname}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 3}}>
                                <TextInput selectionColor='black' activeUnderlineColor="black" style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} label="First Name" onChangeText={setFname}/>
                            </View>
                            <View style={{flex: .1}}></View>
                            <View style={{flex: 1}}>
                                <TextInput selectionColor='black' activeUnderlineColor="black" style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} label="M.I." onChangeText={setMI}/>
                            </View>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.textInputs} label="Address" onChangeText={setAddress}/>
                        </View>
                        <View style={{flexDirection: "row", justifyContent:'space-between', alignItems:'center', marginTop: 20, marginHorizontal:10}}>
                            <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', width:60}} onPress={backToLogin}>
                                <Icon color={'white'} name='arrow-left' size={20}/>
                                <Text style={{color:'white'}}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', width:60}} onPress={showModal}>
                                <Text style={{color:'white'}}>Next</Text>
                                <Icon color={'white'} name='arrow-right' size={20}/>
                            </TouchableOpacity>
                        </View>
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{alignItems:'flex-start', marginBottom: 10}}>
                                    <Button textColor='white' style={{marginHorizontal:10}} onPress={hideModal}>
                                        <Icon color={'white'} name="arrow-left" size={20}/>
                                    </Button>
                                </View>
                                <View>
                                    <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.modalInputs} label="Business Name" onChangeText={setBname}/>
                                </View>
                                <View>
                                    <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.modalInputs} label="Business Address" onChangeText={setBaddress}/>
                                </View>
                                <View>
                                    <TextInput selectionColor='black' activeUnderlineColor="black" style={styles.modalInputs} label="Business Permit Number" onChangeText={setBpermit}/>
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center', marginTop: 10, marginLeft:30}}> 
                                    <Text style={{color: 'white'}}>Payment Options</Text>
                                </View>
                                <View style={{flexDirection:'row', marginLeft:70}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{color:'white'}}>Monthly</Text>
                                        <RadioButton
                                                value="Monthly"
                                                color="#E5D3B3"
                                                status={ payOpt === 'Monthly' ? 'checked' : 'unchecked' }
                                                onPress={() => setPayopt('Monthly')}
                                            />
                                    </View>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{color:'white'}}>Yearly</Text>
                                        <RadioButton
                                            value="Yearly"
                                            color="#E5D3B3"
                                            status={ payOpt === 'Yearly' ? 'checked' : 'unchecked' }
                                            onPress={() => setPayopt('Yearly')}
                                        />
                                    </View>
                                    
                                </View>
                                <View style={{flexDirection:'row', alignItems:'center', marginTop: 10, marginLeft:30}}> 
                                    <Text style={{color: 'white'}}>Ownership Type</Text>
                                </View>
                                <View style={{flexDirection:'row', marginLeft:70}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{color:'white'}}>Retailer</Text>
                                        <RadioButton
                                                value="Retailer"
                                                color="#E5D3B3"
                                                status={ ownType === 'Retailer' ? 'checked' : 'unchecked' }
                                                onPress={() => setOwntype('Retailer')}
                                            />
                                    </View>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{color:'white'}}>Supplier</Text>
                                        <RadioButton
                                            value="Supplier"
                                            color="#E5D3B3"
                                            status={ ownType === 'second' ? 'checked' : 'unchecked' }
                                            onPress={() => setOwntype('Supplier')}
                                        />
                                    </View>
                                    
                                </View>
                                <View style={{alignItems:'center', marginTop: 20}}>
                                    <Button mode="elevated" textColor="black" style={{width: '50%'}} onPress={register}>Submit</Button>
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