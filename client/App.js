import React from 'react';

import Login from './src/Screens/Login/Login';
import Signup from './src/Screens/SignUp/Signup';

// User Screens
import ProductList from './src/Screens/ProductList/ProductList';
import ProductDetail from './src/Screens/ProductDetailScreen/ProductDetail';
import Cart from './src/Screens/CartScreen/Cart';
import AddressList from './src/Screens/AddressListScreen/AddressList';
import OrderPlaced from './src/Screens/OrderPlacedScreen/OrderPlaced';
import Orders from './src/Screens/OrdersScreen/Orders';
import AdminOrders from './src/Screens/Admin/AdminOrdersScreen/AdminOrders';

//Admin Screens
import AdminHome from'./src/Screens/Admin/AdminHomeScreen/AdminHome';
import ManageProducts from './src/Screens/Admin/ManageProductsScreen/ManageProducts';
import AddNewProduct from './src/Screens/Admin/AddNewProductScreen/AddNewProduct';
import UpdateProduct from './src/Screens/Admin/UpdateProductScreen/UpdateProduct';
import UpdateProductForm from './src/Screens/Admin/UpdateProductScreen/UpdateProductForm';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { FontAwesome5 } from '@expo/vector-icons';
import {TouchableOpacity, Text } from 'react-native';
import {Icon, Image, NativeBaseProvider} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {

  const navigation = useNavigation();

  return (
    <NativeBaseProvider>
      <Stack.Navigator>
      {/* working on this screen -- temp*/}
      <Stack.Screen name="Admin Home" component={AdminHome}/>
      <Stack.Screen name="Manage Products" component={ManageProducts}/>
      <Stack.Screen name="Add New Product" component={AddNewProduct}/>
      <Stack.Screen name="Update Product" component={UpdateProduct}/>
      <Stack.Screen name="Update Product Form" component={UpdateProductForm}/>
      <Stack.Screen name='Admin Orders' component={AdminOrders}/>
      
      {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
      <Stack.Screen name="Product List" component={ProductList} options={{title: 'Homoeo World', headerTitleStyle: {fontWeight: '900'},
        headerLeft: () => <Image source= {require('client/assets/icons/stethoscope-blue.png')} style={{height:40, width:32,marginLeft:10}} />
      }}/> 
      <Stack.Screen name="Product Details" component={ProductDetail} options={{headerStyle: {borderBottomWidth: 1, borderBottomColor: '#ccc', }}} />
      <Stack.Screen name="Cart" component={Cart} options={{title: 'My Cart'}}/>
      <Stack.Screen name="Select Address" component={AddressList}/>
      <Stack.Screen name="Order Placed" component={OrderPlaced} options={{headerShown: false}}/>
      <Stack.Screen name="Orders" component={Orders}/> */}
      
    </Stack.Navigator>
    </NativeBaseProvider>
    
  );
}


export default () => {
  return (
    <NavigationContainer>

        <App />
      
    </NavigationContainer>
  )
}