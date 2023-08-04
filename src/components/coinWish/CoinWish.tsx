import React,{useEffect,useContext} from 'react';
import { Image, Text, View,Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { StoreContext } from '../../config/mobX Stores/RootStores';
import { observer } from 'mobx-react-lite';
import { color } from '@rneui/base';
interface CoinWishProps {
    //@ts-ignore
    marketCoin: Stock;
    //@ts-ignore
    eodData?: EodData;
  }

const CoinWish: React.FC<CoinWishProps> = ({ marketCoin, eodData }) =>{


const { stockStore } =useContext(StoreContext);
const {loadingEod,latestEod}=stockStore;
useEffect(()=>{
  stockStore.getLatestEod(marketCoin);
},[])
//@ts-ignore
const navigation=useNavigation();

    return (
        <Pressable 
        style={styles.coinContainer} 
        //@ts-ignore
        onPress={()=>navigation.navigate('Details',{coinId:marketCoin,name:marketCoin,currentPrice:eodData[0]?.open?.toFixed(2)})}>

          {eodData ?<>
            <View>
            <Text style={styles.title}>{marketCoin}</Text>

            <View style={styles.row}>

              <View style={styles.rankContainer}>
                {/* @ts-ignore */}
              <Text style={styles.rank}>{latestEod[0]?.exchange}</Text>
              </View>

              
             
            </View>
        </View>

        <View style={{marginLeft:'auto', alignItems:'flex-end'}}>
          {/* @ts-ignore */}
          <Text style={styles.title}>{eodData ? latestEod[0]?.high?.toFixed(2) : 'N/A'}</Text>
          {/* @ts-ignore */}
          <Text style={{color:'white'}}>Volume {latestEod ? latestEod[0]?.volume : 'N/A'}</Text>
        </View>
          </>:
          <></>
          }
         
      </Pressable>
    );
};
 
export default observer( CoinWish);