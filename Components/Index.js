import { View , StyleSheet} from 'react-native'
import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import Login from './Login'


export default function Index() {
  return (
    <PaperProvider>
        <Login />
    </PaperProvider>
  )
}

