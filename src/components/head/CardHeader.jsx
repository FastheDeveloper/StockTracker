import React,{useEffect,useContext, useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../../screens/CoinsDetails/styles";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../config/mobX Stores/RootStores";
// import { useWatchList} from "../../Contexts/WatchlistContext";

const CardHeader = (props) => {
  const navigation = useNavigation();
  const { coinId, image, symbol, marketCapRank } = props;
  const { stockStore } =useContext(StoreContext);
  const {wishList}=stockStore;
  const [isWish,setIsWish]=useState(false)

  const addToWish=()=>{
    stockStore.getWatchList(symbol)
  }
  const removeWish = () => {
    const symbolToRemove = symbol;
  

    const updatedAssets = wishList.filter((symbbol) => symbbol !== symbolToRemove);
    const StringAsset=updatedAssets.toString()
    

    stockStore.setWishList(updatedAssets);
  };
  
  const handlePress = () => {
    if (isWishListed(symbol)) {
      removeWish()
    } else {
      addToWish();
    }
  };
const isWishListed=(symbol)=>{
  const isSymbolInWishlist = wishList.includes(symbol);

  return isSymbolInWishlist;
}
useEffect(() => {
  const isSymbolWishListed = isWishListed(symbol)
  setIsWish(isSymbolWishListed)
}, [wishList])

  return (
    <View>
      <View style={styles.iconView}>
        <Ionicons
          name="chevron-back-sharp"
          size={35}
          color="white"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mid}>

          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
          <View>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
              #

            </Text>
          </View>
        </View>
        <AntDesign
          name={isWishListed(symbol)  ? "star" : "staro"}
 
          size={24}
          color={isWishListed(symbol)  ? "gold" : "white"}

          onPress={handlePress}
        />
      </View>
    </View>
  );
};

export default observer( CardHeader);
