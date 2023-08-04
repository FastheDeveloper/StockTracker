import React, { useContext } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { AntDesign,EvilIcons } from "@expo/vector-icons";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

import { SwipeListView } from 'react-native-swipe-list-view';
import PortfolioAssetsItems from "./PortfolioAssetsItems";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../config/mobX Stores/RootStores";

const PortfolioAssets = () => {
  const navigation = useNavigation();
  const { stockStore } =useContext(StoreContext);
  const {stocks,loadingStocks,savedAssets}=stockStore;

  const assets = [
    {
      CoinName: "Bitcoin",
      openValue: 50000,
    },
    {
      CoinName: "Ethereum",
      openValue: 3500,
    },
    // Add more assets here...
  ];
  
  function calculateSumOfProduct() {
    let sum = 0;
    
    if(savedAssets.length>0){
      for (const asset of savedAssets) {
        const quantity = parseInt(asset?.boughtAssetQuantity, 10);
        const price = asset?.open  ? parseInt(asset.open, 10) : 0;
        sum += quantity * price;
      }
    }
    return sum;
  }

  const onDeleteAssets = async (asset) => {
    const updatedAssets = savedAssets.filter((item) => item.unique_id !== asset.item.unique_id);

    stockStore.setSavedAssets(updatedAssets);
  };

  const renderDeleteButton =  (data)=>{
    return(
      <Pressable style={{
        flex:1,
        backgroundColor:'#ea3943',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:25,
        marginLeft:20
      }}
      onPress={()=>onDeleteAssets(data)}
      >
        <EvilIcons name="trash" size={30} color="white" />
      </Pressable>
    )
  }

  return (
    <SwipeListView
      data={savedAssets}
      renderItem={({ item }) => <PortfolioAssetsItems assetItem={item} />}
      rightOpenValue={-75}
      disableRightSwipe
      keyExtractor={({id},index)=>`${id}${index}`}
      renderHiddenItem={(data)=>renderDeleteButton(data)}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}>Current Balance</Text>
              <Text style={styles.currentBalanceValue}>
                ${calculateSumOfProduct()}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  // color: isChangePositive() ? "#80dd6d" : "#b60033",
                  color: "#80dd6d" ,
                }}
              >
              </Text>
            </View>
            <View
              style={{
                ...styles.priceChangecontainer,
                color: "#80dd6d" ,
              }}
            >
              <AntDesign
                name={"caretdown"}
                size={14}
                color={"white"}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={styles.percentageChange}>
                {/* 543% */}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.assetsLabel}>Your Assets</Text>
          </View>
        </>
      }
      ListFooterComponent={
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("AddNewAssets")}
        >
          <Text style={styles.buttonText}>Add New Assets</Text>
        </Pressable>
      }
    />
    // <Text>Hello</Text>
  );
};

export default observer( PortfolioAssets);
