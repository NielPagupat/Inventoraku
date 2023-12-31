import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../Components/Login";
import SignUp from "../Components/SignUp"
import Dashboard from "../Components/Dashboard";
import POS from "../Components/POS";
import Inventory from "../Components/Inventory";
import AddProduct from "../Components/AddProduct";
import ProductInfo from '../Components/ProductInfo';
import Profit from '../Components/Profit';
import OrderDetails from '../Components/OrderDetails';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="POS" component={POS} options={{ headerShown: false }}/>
        <Stack.Screen name="Inventory" component={Inventory} options={{ headerShown: false }}/>
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }}/>
        <Stack.Screen name="ProductInfo" component={ProductInfo} options={{ headerShown: false }} />
        <Stack.Screen name="Profit" component={Profit} options={{ headerShown: false }} />
        <Stack.Screen name="orderDetails" component={OrderDetails} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;