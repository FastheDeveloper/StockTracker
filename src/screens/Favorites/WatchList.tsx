import React, { useEffect, useState,useContext } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import Coinitems from "../../components/coinitems";
import { StoreContext } from "../../config/mobX Stores/RootStores";
import { observer } from "mobx-react-lite";
import CoinWish from "../../components/coinWish/CoinWish";
import axios from 'axios'



const WatchList = () => {

  const { stockStore } =useContext(StoreContext);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const {stocks,loadingStocks}=stockStore;
  const [loadingS , setLoadingS ] = useState<boolean>(false);
  const [eodData, setEodData] = useState({});
 
const {wishList}=stockStore;

useEffect(() => {
  const fetchLatestEodData = async () => {
    for (const stock of wishList) {
      //@ts-ignore
      const symbol = stock;
      try {
        setLoadingS(true);
        const res = await axios.get(`http://api.marketstack.com/v1/eod/latest?access_key=f3e3526abd2c04e7c0f205c298274e23&limit=1&symbols=${symbol}`);
        const latestEod = res.data.data;
        setEodData((prevState) => ({ ...prevState, latestEod }));
      } catch (error) {
        console.error(`Error fetching EOD data for ${symbol}`, error);
      }
    }
    setLoadingS(false);
  };
  if (wishList.length > 0) {
    fetchLatestEodData();
  }
}, [eodData]);


  return (
    <FlatList
      data={wishList}
      //@ts-ignore
      renderItem={({ item }) => <CoinWish marketCoin={item} eodData={eodData} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"

        />
      }
    />
  );
};
export default observer( WatchList);
