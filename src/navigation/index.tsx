import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import BottomTab from './bottomTab';
import CoinsDetails from '../screens/CoinsDetails';
import AddNewAssets from '../screens/AddNewAssets';
import CustomDateRange from '../screens/CustomDateRange/CustomDateRange';


const Navigation = () => {
const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="root" component={BottomTab} />
         <Stack.Screen name="Details" component={CoinsDetails}/>
         <Stack.Screen name="AddNewAssets" component={AddNewAssets}/>
         <Stack.Screen name="CustomDate" component={CustomDateRange}/>

    </Stack.Navigator>
  )
}

export default Navigation