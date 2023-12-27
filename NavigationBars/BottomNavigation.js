import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBoxesStacked, faCashRegister, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function BottomNavigation({ Navigation }) {
    const[email, setEmail] = useState(Navigation.getParam('Email'))

    const goToPOS = () => {
        Navigation.navigate('POS',{Email:email})
    }
    const goToInventory = () => {
        Navigation.navigate('Inventory',{Email:email})
    }
  return (
    <View style={{width:'100%'}}>
      <View style={{backgroundColor:'#E5D3B3', paddingTop:5}}>
        <View style={{flexDirection:'row', marginHorizontal:10}}>
          <TouchableOpacity style={{flex:1, 
                                      backgroundColor:'#987554', 
                                      alignItems:'center',
                                      justifyContent:'center', 
                                      marginHorizontal:3, 
                                      height:70,
                                      borderTopLeftRadius:10,
                                      borderTopRightRadius:10,}}>
              <FontAwesomeIcon icon={faDollarSign} size={35} color="#FFFFFF"/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1, 
                                      backgroundColor:'#987554', 
                                      alignItems:'center',
                                      justifyContent:'center', 
                                      marginHorizontal:3, 
                                      height:70,
                                      borderTopLeftRadius:10,
                                      borderTopRightRadius:10,}} onPress={goToPOS}>
              <FontAwesomeIcon icon={faCashRegister} size={35} color="#FFFFFF"/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex:1, 
                                      backgroundColor:'#987554', 
                                      alignItems:'center',
                                      justifyContent:'center', 
                                      marginHorizontal:3, 
                                      height:70,
                                      borderTopLeftRadius:10,
                                      borderTopRightRadius:10,}} onPress={goToInventory}>
              <FontAwesomeIcon icon={faBoxesStacked} size={35} color="#FFFFFF"/>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
