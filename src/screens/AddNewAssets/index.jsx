import { View, TextInput, Text, Pressable } from "react-native";
import React, { useState, useEffect,useContext } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "../../config/mobX Stores/RootStores";
import { observer } from "mobx-react-lite";
import uuid from 'react-native-uuid';

const AddNewAssets = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoinID, setSelectedCoinID] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { stockStore } =useContext(StoreContext);
  const {latest100Stocks,latestEod,loadingStocks,selectedRangeEod,savedAssets}=stockStore;

 useEffect(()=>{
  if(selectedCoin){
  stockStore.getSelectedRangeEod(selectedCoin?.symbol,"2")
  }
 },[selectedCoin])
 const selectedRangedEod = selectedRangeEod?.data?.eod || [];
 const openAndDateArray = selectedRangedEod?.map((item) => {
  return [ new Date(item.date).getTime(),item.open];
});
function calculatePercentageChange(pricesArray) {
  const currentOpen = pricesArray[0][1];
  const previousOpen = pricesArray[1][1];
  const percentageChanges = ((currentOpen - previousOpen) / previousOpen) * 100;
    return percentageChanges;
}
const [percentageChanges,setPercentageChange]=useState(null);
useEffect(() => {
  if (openAndDateArray.length > 0) {
    const percentageChanges = calculatePercentageChange(openAndDateArray);
    setPercentageChange(percentageChanges)
  }
}, [openAndDateArray]);


  useEffect(()=>{
    stockStore.get100ProfileDetails();
  },[])
  useEffect(()=>{
    if(selectedCoin){
      stockStore.getLatestEod(selectedCoin?.symbol);
    }
  },[selectedCoin])
   const navigation=useNavigation();

  const isQuantityEntered = () => boughtAssetQuantity === "";


  const onAddNewAssets = async () => {  
    stockStore.getAllAssets({
      boughtAssetQuantity,
      id: selectedCoin.name,
      unique_id:selectedCoin.name+uuid.v4(),
      name: selectedCoin.name,
      symbol: selectedCoin?.symbol,
      open: latestEod[0]?.open,
      percentageChange: percentageChanges,
    })
    navigation.goBack();
  };

  
  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        items={latest100Stocks}
        onItemSelect={(item) => {setSelectedCoinID(item.name); setSelectedCoin(item)}}
        containerStyle={styles.dropDownCotainer}
        itemStyle={styles.itemStyle}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoinID || "Select a stock..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQuantity}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ color: "white", fontSize: 90 }}
                value={boughtAssetQuantity}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQuantity}
              />
              <Text style={styles.ticker}>{selectedCoin?.symbol}</Text>
            
            </View>
            <Text style={styles.pricePerCoin}>${latestEod[0]?.open} per stock</Text>
            
          </View>
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: "#4169E1",
            }}
            disabled={isQuantityEntered()}
            onPress={onAddNewAssets}
          >
            <Text
              style={{
                ...styles.buttonText,
                color:  "white",
              }}
            >
              Add New Assets
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default observer( AddNewAssets)
