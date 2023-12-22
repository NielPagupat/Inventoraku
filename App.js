import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import { name as appName } from './app.json';
import Index from './Components/Index';


export default function Main() {
  return (
    <PaperProvider>
      <Index />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);