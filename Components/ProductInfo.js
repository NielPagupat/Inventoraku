import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Switch, TextInput, Button, Portal, Modal } from 'react-native-paper';
import TopNavigation from '../NavigationBars/TopNavigation'
import Link from '../Helpers/API';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
const EditableTextInput = ({ label, value, isEditable, onChangeText, rightIcon}) => {
  if (isEditable) {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        right={rightIcon}
      />
    );
  }

  return (
    <TextInput
      label={label}
      value={value}
      editable={false}
      right={rightIcon}
    />
  );
};

const MyForm = () => {
  const [isEditable, setIsEditable] = useState({
    PID: false,
    Pname: false,
    CP: false,
    RP: false,
    Stock: false,
    Desc: false,
  });

  const route = useRoute()
  const {product} = route.params
  const {email} = route.params
  const [userID, setUserID] = useState(product.user_id)
  const [PID, setPID] = useState(product.product_id);
  const [pname, setPname] = useState(product.product_name);
  const [CP, setCP] = useState(product.capital_price);
  const [RP, setRP] = useState(product.retail_price);
  const [stock, setStock] = useState(product.stock);
  const [desc, setDesc] = useState(product.description);
  const [visible, SetVisible] = useState(false);

  const handleToggleEditability = (input) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [input]: !prevState[input],
    }));
  };

  const [resState, setResState] = useState(false)
  const autoResState = () => setResState(!resState)

  const navigation = useNavigation();
  const saveChanges = async () => {
    console.log()
    const result = await axios.post(Link('/save'), {
      "UID": product.user_id,
      "PID": PID,
      "Pname": pname,
      "CP": parseFloat(CP),
      "RP": parseFloat(RP),
      "Desc": desc
    }, {headers:{'Content-Type': 'application/json'}}).then(function (response){
      if (response.status == 200) {
          alert('Save Succesful')
          // navigation.navigate('Inventory', {email, userID})
      } else {
          alert('SaveFailed')
      }
  })
  }

  const backToInventory = () => {
    navigation.navigate('Inventory', {email})
  }

  const showModal = () => SetVisible(true);
  const hideModal = () => SetVisible(false);
  const containerStyle = {backgroundColor: '#FFFBF3', height: 500, margin: 40, borderRadius: 5};

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FFFBF3'}}>
      <View><TopNavigation val="Inventory" onPress={backToInventory} Email={email}/></View>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
        <Text style={{color:'#212427'}}>Auto-Resupply?</Text>
        <Switch value={resState} onValueChange={autoResState} />
        <TouchableOpacity style={{marginRight:15}} onPress={showModal}>
          <Text style={{color:'#987554'}}>Edit Resupply Details</Text>
        </TouchableOpacity>
      </View>
      <EditableTextInput
        label='Product ID'
        value={PID}
        isEditable={isEditable.PID}
        onChangeText={setPID}
        rightIcon={<TextInput.Icon icon='pen' onPress={() => handleToggleEditability('PID')}/>}
      />
      <EditableTextInput
        label='Product Name'
        value={pname}
        isEditable={isEditable.Pname}
        onChangeText={setPname}
        rightIcon={<TextInput.Icon icon='pen' onPress={() => handleToggleEditability('Pname')}/>}
      />
      <EditableTextInput
        label='Capital Price'
        value={CP}
        isEditable={isEditable.CP}
        onChangeText={setCP}
        rightIcon={<TextInput.Icon icon='pen' onPress={() => handleToggleEditability('CP')}/>}
      />
      <EditableTextInput
        label='Retail Price'
        value={RP}
        isEditable={isEditable.RP}
        onChangeText={setRP}
        rightIcon={<TextInput.Icon icon='pen' onPress={() => handleToggleEditability('RP')}/>}
      />
      <EditableTextInput
        label='Stock'
        value={stock.toString()}
        isEditable={isEditable.Stock}
        onChangeText={setStock}
        rightIcon={<TextInput.Icon icon='plus'/>}
      />
      <EditableTextInput
        label='Description'
        value={desc}
        isEditable={isEditable.Desc}
        onChangeText={setDesc}
        rightIcon={<TextInput.Icon icon='pen' onPress={() => handleToggleEditability('Desc')}/>}
      />

      <Button
        onPress={saveChanges}
      >Save Changes</Button>

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View style={{alignItems:'flex-end', marginTop:10, marginHorizontal:20}}>
            <FontAwesomeIcon style={{color:'#FF4E4E'}} size={30} icon={faCircleXmark} />
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:20, marginBottom:30}}>Resupplying Details</Text>
            <View style={{flexDirection:'row', width:'85%'}}>
              <TextInput underlineColor="transparent" label="Product Name" style={{flex:3, marginHorizontal:2, marginBottom:5, borderRadius:5, backgroundColor:'#D9D9D9'}}/>
              <TextInput underlineColor="transparent" label="Qty." style={{flex:1, marginHorizontal:2, marginBottom:5, borderRadius:5, backgroundColor:'#D9D9D9'}}/>
            </View>
            <View style={{ width:'85%'}}>
              <TextInput underlineColor="transparent" label="Supplier Name" style={{marginHorizontal:2, marginBottom:5, borderRadius:5, backgroundColor:'#D9D9D9'}}/>
              <TextInput underlineColor="transparent" label="Supplier Contact #" style={{marginHorizontal:2, marginBottom:5, borderRadius:5, backgroundColor:'#D9D9D9'}}/>
            </View>
            <View style={{ width:'85%'}}>
              <TextInput underlineColor="transparent" label="Delivery Address" style={{marginHorizontal:2, marginBottom:5, borderRadius:5, backgroundColor:'#D9D9D9'}}/>
              <TextInput underlineColor="transparent" label="Expected Delivery Date" style={{marginHorizontal:2, marginBottom:5, borderRadius:5, backgroundColor:'#D9D9D9'}}/>
            </View>
            <TouchableOpacity style={{marginVertical:10}}>
              <FontAwesomeIcon icon={faCircleCheck} size={50} style={{color:'#987554'}}/>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default MyForm;