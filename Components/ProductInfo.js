import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Switch, TextInput, Button, Portal, Modal } from 'react-native-paper';
import TopNavigation from '../NavigationBars/TopNavigation';
import BottomNavigation from '../NavigationBars/BottomNavigation';
import Link from '../Helpers/API';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faCircleXmark, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

export default function ProductInfo() {
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

  const [qty, setQTY] = useState()
  const [suppName, setSuppName] = useState()
  const [suppEmail, setSuppEmail] = useState()
  const [delvAddress, setDelvAddress] = useState()
  const [exDeliveryDate, setExDeliveryDate] = useState()


  const handleResupply = async () => {
    const res = await axios.post(Link('/subRdetails'), {
      'Pname': pname,
      'PID': PID,
      'qty': qty,
      'suppName': suppName,
      'suppEmail': suppEmail,
      'delvAddr': delvAddress,
      'exDelvDate': exDeliveryDate
    },{headers:{'Content-Type': 'application/json'}}).then((response)=>{
      if (response.status == 200) {
        alert('Succes')
      } else {
        alert('fail')
      }
    })
  }
  const handleToggleEditability = (input) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [input]: !prevState[input],
    }));
  };
  
  const [PIDModal, setPIDModal] = useState(false);
  const [pNameModal, setPNameModal] = useState(false);
  const [CPModal, setCPModal] = useState(false);
  const [RPModal, setRPModal] = useState(false);
  const [stockModal, setStockModal] = useState(false);
  const [descModal, setDescModal] = useState(false);

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

  const detailsContainerStyle = {margin: 20};
  const showPIDModal = () => setPIDModal(true);
  const showPnameModal = () => setPNameModal(true);
  const showCPModal = () => setCPModal(true);
  const showRPModal = () => setRPModal(true);
  const showStockModal = () => setStockModal(true);
  const showDescModal = () => setDescModal(true);
  
  const hidePIDModal = () => setPIDModal(false);
  const hidePnameModal = () => setPNameModal(false);
  const hideCPModal = () => setCPModal(false);
  const hideRPModal = () => setRPModal(false);
  const hideStockModal = () => setStockModal(false);
  const hideDescModal = () => setDescModal(false);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#FFFBF3'}}>
      <View><TopNavigation val="Inventory" onPress={backToInventory} Email={email}/></View>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginTop:10}}>
        <Text style={{color:'#212427'}}>Auto-Resupply?</Text>
        <Switch value={resState} onValueChange={autoResState} />
        <TouchableOpacity style={{marginRight:20}} onPress={showModal}>
          <Text style={{color:'#987554'}}>Edit Resupply Details</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:1, marginVertical:10, marginHorizontal:20}}>
        <TextInput label="Product ID" value={PID} editable={false} onChangeText={setPID}
        right={<TextInput.Icon icon='pen' onPress={showPIDModal}/>}
        style={{backgroundColor:'#D9D9D9', marginBottom:10, borderRadius:5}} underlineColor='transparent'/>
        <TextInput label="Product Name" value={pname} editable={false} onChangeText={setPname}
        right={<TextInput.Icon icon='pen' onPress={showPnameModal}/>}
        style={{backgroundColor:'#D9D9D9', marginBottom:10, borderRadius:5}} underlineColor='transparent'/>
        <TextInput label="Capital Price" value={CP} editable={false} onChangeText={setCP}
        right={<TextInput.Icon icon='pen' onPress={showCPModal}/>}
        style={{backgroundColor:'#D9D9D9', marginBottom:10, borderRadius:5}} underlineColor='transparent'/>
        <TextInput label="Retail Price" value={RP} editable={false} onChangeText={setRP}
        right={<TextInput.Icon icon='pen' onPress={showRPModal}/>}
        style={{backgroundColor:'#D9D9D9', marginBottom:10, borderRadius:5}} underlineColor='transparent'/>
        <TextInput label="Stock" value={stock.toString()} editable={false} onChangeText={setStock}
        right={<TextInput.Icon icon='pen' onPress={showStockModal}/>}
        style={{backgroundColor:'#D9D9D9', marginBottom:10, borderRadius:5}} underlineColor='transparent'/>
        <TextInput label="Description" value={desc} editable={false} onChangeText={setDesc}
        right={<TextInput.Icon icon='pen'  onPress={showDescModal}/>}
        style={{backgroundColor:'#D9D9D9', marginBottom:10, borderRadius:5}} underlineColor='transparent'/>
        
        <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', marginVertical:20, marginHorizontal:60, backgroundColor:'#987554', height:40, borderRadius:10, paddingHorizontal:55}} onPress={saveChanges}>
          <Text style={{color:'#F5F5F5'}}>Save Changes</Text>
          <FontAwesomeIcon style={{color:'#F5F5F5'}} size={20} icon={faFloppyDisk}/>
        </TouchableOpacity>
     </View>  

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View style={{alignItems:'flex-end', marginTop:10, marginHorizontal:20}}>
            <TouchableOpacity onPress={hideModal}>
              <FontAwesomeIcon style={{color:'#FF4E4E'}} size={30} icon={faCircleXmark} />
            </TouchableOpacity>
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

      <Portal>
        <Modal contentContainerStyle={detailsContainerStyle} visible={PIDModal} onDismiss={hidePIDModal}>
          <TextInput 
            style={{backgroundColor:'#D9D9D9', borderRadius:5}} underlineColor='transparent' activeUnderlineColor='#987554' label="Product ID" value={PID} onChangeText={setPID} right={<TextInput.Icon icon='check' onPress={hidePIDModal}/>}
            />
        </Modal>
      </Portal>
      <Portal>
        <Modal contentContainerStyle={detailsContainerStyle} visible={pNameModal} onDismiss={hidePnameModal}>
          <TextInput 
            style={{backgroundColor:'#D9D9D9', borderRadius:5}} underlineColor='transparent' activeUnderlineColor='#987554' label="Product Name" value={pname} onChangeText={setPname} right={<TextInput.Icon icon='check' onPress={hidePnameModal}/>}
            />
        </Modal>
      </Portal>
      <Portal>
        <Modal contentContainerStyle={detailsContainerStyle} visible={CPModal} onDismiss={hideCPModal}>
          <TextInput 
            style={{backgroundColor:'#D9D9D9', borderRadius:5}} underlineColor='transparent' activeUnderlineColor='#987554' label="Capital Price" value={CP} onChangeText={setCP} right={<TextInput.Icon icon='check' onPress={hideCPModal}/>}
            />
        </Modal>
      </Portal>
      <Portal>
        <Modal contentContainerStyle={detailsContainerStyle} visible={RPModal} onDismiss={hideRPModal}>
          <TextInput 
            style={{backgroundColor:'#D9D9D9', borderRadius:5}} underlineColor='transparent' activeUnderlineColor='#987554' label="Retail Price" value={RP} onChangeText={setRP} right={<TextInput.Icon icon='check' onPress={hideRPModal}/>}
            />
        </Modal>
      </Portal>
      <Portal>
        <Modal contentContainerStyle={detailsContainerStyle} visible={stockModal} onDismiss={hideStockModal}>
          <TextInput 
            style={{backgroundColor:'#D9D9D9', borderRadius:5}} underlineColor='transparent' activeUnderlineColor='#987554' label="Stock" value={stock} onChangeText={setStock} right={<TextInput.Icon icon='check' onPress={hideStockModal}/>}
            />
        </Modal>
      </Portal>
      <Portal>
        <Modal contentContainerStyle={detailsContainerStyle} visible={descModal} onDismiss={hideDescModal}>
          <TextInput 
            style={{backgroundColor:'#D9D9D9', borderRadius:5}} underlineColor='transparent' activeUnderlineColor='#987554' label="Description" value={desc} onChangeText={setDesc} right={<TextInput.Icon icon='check' onPress={hideDescModal}/>}
            />
        </Modal>
      </Portal>
      <View style={{width:'100%'}}><BottomNavigation Email = {email} /></View>
    </SafeAreaView>
  );
};

