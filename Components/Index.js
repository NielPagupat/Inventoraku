import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import App from '../routes/loginStack'

export default function Index() {
  return (
    <PaperProvider>
        <App />
    </PaperProvider>
  )
}

