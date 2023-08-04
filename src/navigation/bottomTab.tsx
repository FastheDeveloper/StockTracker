import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/HomeScreen";
import WatchList from "../screens/Favorites/WatchList";
import PortfolioScreen from "../screens/Portfolio";

const Tabs = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tabs.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "grey",
      tabBarStyle: {
        backgroundColor: "#121212",
      },
    }}
  >
    <Tabs.Screen
      name={"Home"}
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <AntDesign name="home" size={focused ? 30 : 25} color={color} />
        ),
      }}
    />

    <Tabs.Screen
      name={"Portfolio"}
      component={PortfolioScreen}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <AntDesign name="piechart" size={focused ? 32 : 27} color={color} />
        ),
      }}
    />

    <Tabs.Screen
      name={"Watchlist"}
      component={WatchList}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <AntDesign name="staro" size={focused ? 30 : 25} color={color} />
        ),
      }}
    />
  </Tabs.Navigator>
  )
}

export default BottomTab