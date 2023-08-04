import React,{useEffect,useContext} from 'react';
import { Image, Text, View,Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { StoreContext } from '../../config/mobX Stores/RootStores';
import { observer } from 'mobx-react-lite';
import { color } from '@rneui/base';

interface CoinItemsProps {
  //@ts-ignore
  marketCoin: Stock;
  //@ts-ignore
  eodData?: EodData;
}

const CoinItems: React.FC<CoinItemsProps> = ({ marketCoin, eodData }) =>{
  const  {
    name,
    symbol,
}=marketCoin;

const { stockStore } =useContext(StoreContext);
const {loadingEod,latestEod}=stockStore;
useEffect(()=>{
  stockStore.getLatestEod(symbol);
},[])
const navigation=useNavigation();

    const percentagecolor = '#80dd6d'



    return (
        <Pressable 
        style={styles.coinContainer} 
        //@ts-ignore
        onPress={()=>navigation.navigate('Details',{coinId:symbol,name:name,currentPrice:eodData[0]?.open?.toFixed(2)})}>
          {eodData ?<>
            <View>
            <Text style={styles.title}>{name}</Text>

            <View style={styles.row}>

              <View style={styles.rankContainer}>
              <Text style={styles.rank}>{symbol}</Text>
              </View>

              
              <Text style={styles.text}>{symbol}</Text>
            </View>
        </View>

        <View style={{marginLeft:'auto', alignItems:'flex-end'}}>
          <Text style={styles.title}>{eodData ? eodData[0]?.high?.toFixed(2) : 'N/A'}</Text>
          <Text style={{color:'white'}}>Volume {eodData ? eodData[0]?.volume : 'N/A'}</Text>
        </View>
          </>:
          <></>
          }
         
      </Pressable>
    );
};
 
export default observer( CoinItems);