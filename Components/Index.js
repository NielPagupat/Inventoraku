import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import LoginStack from '../routes/loginStack'

export default function Index() {
  return (
    <PaperProvider>
        <LoginStack/>
    </PaperProvider>
  )
}

