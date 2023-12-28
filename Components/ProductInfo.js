import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Switch, TextInput, Button } from 'react-native-paper';
import Link from '../Helpers/API';
import axios from 'axios';
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


  return (
    <View>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
        <Text>Auto-Ressuply?</Text>
        <Switch value={resState} onValueChange={autoResState} />
        <Button>Edit Ressuply Details</Button>
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
      
    </View>
  );
};

export default MyForm;