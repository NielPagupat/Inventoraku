import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
export default function ProductInfo() {
  const route = useRoute()
  const {product} = route.params
  const [PID, setPID] = useState(product.product_id)
  const [UID, setUID] = useState(product.user_id)
  const [pname, SetPname] = useState(product.product_name)
  const [CP, setCP] = useState(product.capital_price)
  const [RP, setRP] = useState(product.retail_price)
  const [stock, setStock] = useState(product.stock)
  const [desc, setDesc] = useState(product.description)
  return (
    <View>
      <TextInput label='Product ID' value={PID} editable={false} onChangeText={setPID} right={<TextInput.Icon icon={'pen'}/>}/>
      <TextInput label='Product Name' value={pname} editable={false} onChangeText={SetPname} right={<TextInput.Icon icon={'pen'}/>}/>
      <TextInput label='Capital Price' value={CP} editable={false} onChangeText={setCP} right={<TextInput.Icon icon={'pen'}/>}/>
      <TextInput label='Retail Price' value={RP} editable={false} onChangeText={setRP} right={<TextInput.Icon icon={'pen'}/>}/>
      <TextInput label='Stock' value={stock.toString()} editable={false} right={<TextInput.Icon icon={'plus'}/>}/>
      <TextInput label='Description' value={desc} editable={false} onChangeText={setDesc} right={<TextInput.Icon icon={'pen'}/>}/>
    </View>
  )
}