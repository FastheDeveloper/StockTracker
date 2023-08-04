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
  Pressable
} from "react-native";
import { observer } from 'mobx-react-lite';
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import Filters from "./FilterComponent";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CardHeader from "../../components/head/CardHeader";
import { StoreContext } from "../../config/mobX Stores/RootStores";
import {useNavigation} from '@react-navigation/native'

const CoinsDetails = () => {
  const navigation=useNavigation();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const now = new Date().getHours();
    if (now <= 11) {
      setMessage("Good Morning, Ohayo!");
    } else if (now > 11 && now < 17) {
      setMessage("Good afternoon, konnichiwa!");
    } else if (now >= 17) {
      setMessage("Good evening, Konbanwa!");
    }
  }, []);

  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId,name,currentPrice },
  } = route;
  const { stockStore } =useContext(StoreContext);
const {loadingStocks,selectedRangeEod}=stockStore;
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("3");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const fetchCoinData = async () => {
    setLoading(true);
 
    setCoin('');
    setUsdValue(currentPrice);
    setLoading(false);
  };

  const getSelectedRangeData=  ()=>{
     stockStore.getSelectedRangeEod(coinId,selectedRange)
  }

  useEffect(()=>{
     getSelectedRangeData();
  },[selectedRange])


const selectedRangedEod = selectedRangeEod?.data?.eod || [];

const openAndDateArray = selectedRangedEod?.map((item) => {
  return [ new Date(item.date).getTime(),item.open];
});

function extractOpenAndTimestamp(data) {
  const priceArray = [];
  for (const entry of data) {
    const openValue = entry.open;
    const dateValue = new Date(entry.date).getTime();
    priceArray.push([ dateValue,openValue]);
  }
  return priceArray;
}

function extractOHLCData(data) {
  const ohlcArray = [];
  for (const entry of data) {
    const timestamp = new Date(entry.date).getTime();
    const openValue = entry.open;
    const highValue = entry.high;
    const lowValue = entry.low;
    const closeValue = entry.close;
    ohlcArray.push([timestamp, openValue, highValue, lowValue, closeValue]);
  }
  return ohlcArray;
}


const priceArray = extractOpenAndTimestamp(selectedRangedEod);
const ohlcArray=extractOHLCData(selectedRangedEod)


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

  const fetchMarketCoinData = async (selectedRangeValue) => {
      if(priceArray.length>0){
        setCoinMarketData(priceArray);

      }
  };

  const fetchCandleStickChartData = async (selectedRangeValue) => {
    if(ohlcArray.length>0){
      setCoinCandleChartData(ohlcArray);

    }
  

  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1); 
    fetchCandleStickChartData();
  }, []);



  if (loadingStocks ||!openAndDateArray||!selectedRangeEod) {
    return <ActivityIndicator size="large" />;
  }


  const changeUsd = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value) || 0;
    const ans = floatValue / currentPrice;
    setCoinValue(ans.toFixed(2).toString());
  };

  const changeCoin = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value) || 0;
    const ans = floatValue * currentPrice;
    setUsdValue(ans.toString());
  };

 


  const screenWidth = Dimensions.get("window").width;

  const percentagecolor = percentageChanges !== null ? (percentageChanges < 0 ? "#b60033" : "#80dd6d") : "white";

  const chartColor =percentageChanges !== null ? (currentPrice > openAndDateArray[1][1] ? "#80dd6d" : "#b60033"):"white";

  
  function reverseAndMapToLineChartData(data) {
    const reversedData = data.slice().reverse();
    return reversedData.map(([timestamp, value]) => ({ timestamp, value }));
  }

  function reverseAndMapToOHLCChartData(data) {
    const reversedData = data.slice().reverse();
    return reversedData.map(([timestamp, openValue, highValue, lowValue, closeValue]) => ({
      timestamp,
      open: openValue,
      high: highValue,
      low: lowValue,
      close: closeValue,
    }));
  }
  
  return (
    openAndDateArray.length > 0 ? (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider
        data={reverseAndMapToLineChartData(priceArray)}
      >
        <CardHeader
          coinId={coinId}
          image={''}
          name={name}
          symbol={coinId}
          marketCapRank={currentPrice}
        />
        <View style={{ padding: 10, marginRight: -9 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.names}>{name}</Text>
              <Text style={styles.price}>${currentPrice}</Text>
            </View>
            <View style={{}}>
              <Text
                style={{
                  color: percentagecolor,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {percentageChanges?.toFixed(2)}%
              </Text>
            </View>
          </View>
          <Text style={{ color: "white", letterSpacing: 4, fontSize: 12 }}>
            {message}
          </Text>
          <View style={styles.timeFilterContainer}>
            <Filters
              filterDay="3"
              filterText="3d"
              selectedRange={selectedRange}
              setSelectedRange={()=>setSelectedRange('3')}
            />
            <Filters
              filterDay="7"
              filterText="7d"
              selectedRange={selectedRange}
              setSelectedRange={()=>setSelectedRange('7')}
            />
            <Filters
              filterDay="30"
              filterText="30d"
              selectedRange={selectedRange}
              setSelectedRange={()=>setSelectedRange('30')}
            />
           
            <Filters
              filterDay="max"
              filterText="All"
              selectedRange={selectedRange}
              setSelectedRange={()=>setSelectedRange('100')}
            />
            {isCandleChartVisible  ?(
                <AntDesign name="linechart" size={24} color={chartColor} onPress={()=>setIsCandleChartVisible(false)}/>
            ): (
            <MaterialIcons name="waterfall-chart" size={24} color={chartColor} onPress={()=>setIsCandleChartVisible(true)}/>
            )}
            
            
          </View>
        </View>
              {isCandleChartVisible ? (
                <CandlestickChart.Provider 
                data={reverseAndMapToOHLCChartData(ohlcArray)}
              >
                <CandlestickChart height={screenWidth / 2} width={screenWidth}>
                  <CandlestickChart.Candles />
                  <CandlestickChart.Crosshair>
                    <CandlestickChart.Tooltip/>
                  </CandlestickChart.Crosshair>
                </CandlestickChart>
                
                <CandlestickChart.DatetimeText style={{color:'white',fontWeight:'700',margin:10}} />
      
              </CandlestickChart.Provider>
              ):(
                <LineChart height={screenWidth / 2} width={screenWidth}>
          <LineChart.Path color={chartColor} />
          <LineChart.CursorCrosshair />
        </LineChart>
              )}
        

        

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {coinId?.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoin}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsd}
            />
          </View>
        </View>
      </LineChart.Provider>
      <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: "#4169E1",
            }}
            // disabled={isQuantityEntered()}
            onPress={()=>navigation.navigate('CustomDate',{coinId,currentPrice})}
          >
            <Text
              style={{
                ...styles.buttonText,
                color:  "white",
              }}
            >
              Use Custom Date Range
            </Text>
          </Pressable>
    </View>
     ) : (
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white'}}>hello</Text>
      </View>
    )
  );
};
export default observer(CoinsDetails);
