import React,{useEffect,useContext} from 'react';
import { Image, Text, View,Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native'
import { StoreContext } from '../../config/mobX Stores/RootStores';
import { observer } from 'mobx-react-lite';
import { color } from '@rneui/base';
import styles from './styles';


const CoinDate= ({ marketCoin,  }) =>{
  const  {
    name,
    symbol,
    date,
    volume,open
}=marketCoin;

const { stockStore } =useContext(StoreContext);
const {loadingEod,latestEod}=stockStore;
useEffect(()=>{
  stockStore.getLatestEod(symbol);
},[])

const navigation=useNavigation();

    return (
        <Pressable 
        style={styles.coinContainer} 
        //@ts-ignore
        onPress={()=>navigation.goBack()}>

       
            <View>
            <Text style={styles.title}>{name}</Text>

            <View style={styles.row}>

              <View style={styles.rankContainer}>
              <Text style={styles.rank}>{date?.slice(0, 10).toString()}</Text>
              </View>

              
              <Text style={styles.text}>{symbol}</Text>
            
            </View>
        </View>

        <View style={{marginLeft:'auto', alignItems:'flex-end'}}>
          <Text style={styles.title}>{open}</Text>
          <Text style={{color:'white'}}>Volume {volume }</Text>
        </View>
         
    
    
      </Pressable>
    );
};
 
export default observer( CoinDate);