import React, { useState, useEffect,useContext } from "react";
import "react-native-gesture-handler";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Pressable
} from "react-native";
import { observer } from 'mobx-react-lite';
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import CardHeader from "../../components/head/CardHeader";
import { StoreContext } from "../../config/mobX Stores/RootStores";
import CoinDate from "../../components/coindate/CoinDate";



const CustomDateRange = () => {
  const navigation=useNavigation();


  const route = useRoute();
  const {
    params: { coinId,name,currentPrice },
  } = route;
  const { stockStore } =useContext(StoreContext);
const {loadingStocks,selectedDateRangeEod}=stockStore;
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [showStartDatePicker, setShowStartDatePicker] = useState(false);
const [showEndDatePicker, setShowEndDatePicker] = useState(false);
const datte=new Date();
const today = new Date();
  // Function to handle start date selection
  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate?.toISOString().slice(0, 10));
  };

  // Function to handle end date selection
  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate?.toISOString().slice(0, 10).toString());
  };

  const getRange=()=>{
    
  }

  useEffect(()=>{
    if(endDate && startDate && coinId){
      stockStore.getSelectedDateRangeEod(coinId,startDate,endDate)
    }
  },[startDate,endDate])






  return (

    <View style={{ paddingHorizontal: 10 }}>
    
        <CardHeader
          coinId={coinId}
          image={''}
          name={name}
          symbol={coinId}
          marketCapRank={currentPrice}
        />
        {startDate && endDate?
          <FlatList
          data={selectedDateRangeEod?.data}
          //@ts-ignore
          renderItem={({ item }) => <CoinDate marketCoin={item}  />}
  
         
        /> 
     
        :

      <View>
         <Text style={{color:'white',marginTop: 25,marginHorizontal: 10,}}>
            Start Date
         </Text>
      <Pressable
          style={styles.buttonContainer}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text style={styles.buttonText}>{startDate ? startDate:'Pick a start date'}</Text>
        </Pressable>
      {showStartDatePicker && (
        <DateTimePicker
          value={datte}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          maximumDate={today}
        />
      )}

      <Text style={{color:'white',marginTop: 25,marginHorizontal: 10,}}>
            End Date
         </Text>
      <Pressable
          style={styles.buttonContainer}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Text style={styles.buttonText}>{endDate? endDate:'Pick a end date'}</Text>
        </Pressable>
      {showEndDatePicker && (
        <DateTimePicker
          value={datte}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          maximumDate={today}
        />
      )}

    </View>
  }
      
    </View>
    
    )
 
};
export default observer(CustomDateRange);
// @react-native-community/datetimepicker