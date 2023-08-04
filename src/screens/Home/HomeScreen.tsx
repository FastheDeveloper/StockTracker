import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { StoreContext } from '../../config/mobX Stores/RootStores'
import CoinItems from '../../components/coinitems'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

interface Stock {
  name: string;
  symbol: string;
}

interface EodData {
  adj_close: number;
  adj_high: number;
  adj_low: number;
  adj_open: number;
  adj_volume: number;
  close: number;
  date: string;
  dividend: number;
  exchange: string;
  high: number;
  low: number;
  open: number;
  split_factor: number;
  symbol: string;
  volume: number;
  // Add other properties here, if needed
}


const HomeScreen = () => {
  const { stockStore } =useContext(StoreContext);
  const {stocks,loadingStocks}=stockStore;
  const [loadingS , setLoadingS ] = useState<boolean>(false);
  const [eodData, setEodData] = useState<{ [symbol: string]: EodData }>({});

  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
   
    });

    return () => {
      unsubscribe();
    };
  }, []);
  

  useEffect(()=>{
    stockStore.getProfileDetails();
  },[])
  useEffect(() => {

    const fetchLatestEodData = async () => {
      for (const stock of stocks) {
        //@ts-ignore
        const symbol = stock?.symbol;
        try {
          setLoadingS(true);
          const res = await axios.get(`http://api.marketstack.com/v1/eod/latest?access_key=f3e3526abd2c04e7c0f205c298274e23&limit=1&symbols=${symbol}`);
          const latestEod = res.data.data;
          setEodData((prevState) => ({ ...prevState, [symbol]: latestEod }));
        } catch (error) {
          console.error(`Error fetching EOD data for ${symbol}`, error);
        }
      }
      setLoadingS(false);
    };
    if (stocks.length > 0) {
      fetchLatestEodData();
    }
  }, [stocks]);
if(isOffline){
  toast.show('You are offline, reconnect and retry', {
  type: 'danger',
})
}


  return (
  <>
  {isOffline? <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>

    <Text style={{color:'red'}}>You Are offline, Please reconnect</Text>
  </View> :
  <View>
  <View style={{flexDirection:'row' ,justifyContent:'space-around',alignItems:'center'}}>
<Text
  style={{
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
  }}
>
  STOCK TRACKER
</Text>
<Text style={{color:'white',fontSize:10,paddingHorizontal:10}}> powered by MarketStack</Text>
</View>
 <FlatList
  data={stocks}
  //@ts-ignore
  renderItem={({ item }) => <CoinItems marketCoin={item} eodData={eodData[item?.symbol]} />}
/> 
</View>
  }
  
  </>
    
  )
}

export default observer( HomeScreen)

const styles = StyleSheet.create({

})