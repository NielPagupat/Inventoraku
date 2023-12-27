import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp"
import Dashboard from "../Components/Dashboard";
import POS from "../Components/POS";
import Inventory from "../Components/Inventory";
import AddProduct from "../Components/AddProduct";
const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            headerShown: false
        }
    },
    Dashboard:{
        screen: Dashboard,
        navigationOptions: {
            headerShown: false
        }
    },
    POS:{
        screen: POS,
        navigationOptions: {
            headerShown: false
        }
    },
    Inventory:{
        screen: Inventory,
        navigationOptions: {
            headerShown: false
        }
    },
    AddProduct:{
        screen: AddProduct,
        navigationOptions: {
            headerShown: false
        }
    }
    
}

const AppStack = createStackNavigator(screens);

export default createAppContainer(AppStack);