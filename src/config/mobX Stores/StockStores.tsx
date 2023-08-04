import axios from 'axios';
import { configure, makeAutoObservable, runInAction, toJS } from 'mobx';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

configure({ enforceActions: 'never' });
interface AssetDetails {
  boughtAssetQuantity: number;
  id: string;
  name: string;
  symbol?: string;
  open: number;
  percentageChange: number;
  unique_id:string
}
interface wish {
  symbol?: string;
}

export class StockStores {
  loadingEod = false;
  loadingStocks = false;
  sending = false;
  error = '';
  success = '';
  billDetailId = '';
  othersSus = '';
  token: string | undefined;
  stocks = [];
  latestEod=[]
  latest100Stocks=[]
  stockById= [];
  selectedRangeEod={};
  selectedDateRangeEod={}
  savedAssets: AssetDetails[] = [];
  wishList:wish[]=[]
  BASE_URL = 'http://api.marketstack.com/v1'
  BASE_KEY='f3e3526abd2c04e7c0f205c298274e23'
  constructor() {
    makeAutoObservable(this);
  }

  


  getProfileDetails() {
    this.setLoadingStocks(true);
    axios
      .get(`${this.BASE_URL}/tickers?access_key=${this.BASE_KEY}&limit=16`)
      .then(async (res) => {
        const filteredStocks = res.data.data.filter((item: { has_eod: boolean; symbol: string; }) => {
          // "MA", "PG"
          const allowedSymbols = ["AAPL", "AMZN", "GOOG", "GOOGL", "BABA", "VOD", "V", "JPM", "JNJ", "WMT"];
          return item.has_eod === true && allowedSymbols.includes(item.symbol);
        });
        this.setAllStocks(filteredStocks);
        runInAction(() => {
          this.loadingStocks = false;
        });
      })
      .catch((_err) => {
        runInAction(() => {
          this.loadingStocks = false;
        });
      });
  }
  
  get100ProfileDetails() {
    this.setLoadingStocks(true);
    axios
      .get(`${this.BASE_URL}/tickers?access_key=${this.BASE_KEY}`)
      .then(async (res) => {
        this.set100AllStocks(res.data.data);
        runInAction(() => {
          this.loadingStocks = false;
        });
      })
      .catch((_err) => {
        runInAction(() => {
          this.loadingStocks = false;
        });
      });
  }
  
  getLatestEod(details:string){
    this.setLoadingStocks(true);
    axios
    .get(`${this.BASE_URL}/eod/latest?access_key=${this.BASE_KEY}&limit=10&symbols=${details}`)
      .then(async (res) => {
        this.setAllLatestEod(res.data.data);
       
        runInAction(() => {
          this.loadingEod = false;
          return res.data.data;
        });
        
      })
      .catch((_err) => {
        runInAction(() => {
          this.loadingEod = false;
        });
      });
      
  }

  getSelectedRangeEod(symbol:string,range:string){
    this.setLoadingStocks(true);
    axios
    .get(`${this.BASE_URL}/tickers/${symbol}/eod?access_key=${this.BASE_KEY}&limit=${range}`)
      .then(async (res) => {
        this.setSelectedRangeEod(res.data);
        
        runInAction(() => {
          this.loadingStocks = false;
        
        });
        
      })
      .catch((_err) => {
        runInAction(() => {
          this.loadingStocks = false;
        });
      });
      
  }

  getSelectedDateRangeEod(symbol:string,start:string,end:string){

    this.setLoadingStocks(true);
    axios
    .get(`${this.BASE_URL}/eod?access_key=${this.BASE_KEY}&symbols=${symbol}&date_from=${start}&date_to=${end}`)
      .then(async (res) => {
        this.setSelectedDateRangeEod(res.data);
        runInAction(() => {
          this.loadingStocks = false;
        });
      })
      .catch((_err) => {
        console.log(_err)
        runInAction(() => {
          this.loadingStocks = false;
          
        });
      });
      
  }

  getAllAssets(details: AssetDetails) {
    const newAsset:AssetDetails = {
      boughtAssetQuantity: details.boughtAssetQuantity,
      id: details.id,
      name: details.name,
      symbol: details.symbol,
      open: details.open,
      percentageChange: details.percentageChange,
      unique_id:details.unique_id,
    };
  
    // Push the newAsset object into the savedAssets array
    if(newAsset){
      this.savedAssets.push(newAsset);

    }
  
    // Save the updated array using setSavedAssets function
    this.setSavedAssets(this.savedAssets);
  }
  
  getWatchList(details:any){
    const newAsse:wish = details
    ;
    
    if(newAsse){
      this.wishList.push(newAsse);
    }
  
    this.setWishList(this.wishList);
  }
  

  setAllLatestEod=(res:any)=>{
    this.latestEod=res;
  }
  set100AllStocks=(res:any)=>{
    this.latest100Stocks=res;
  }
  setSelectedRangeEod=(res:any)=>{
    this.selectedRangeEod=res;
  }
  setSelectedDateRangeEod=(res:any)=>{
    this.selectedDateRangeEod=res;
  }
  setLoadingLatestEod=(val:boolean)=>{
    this.loadingEod=val
  }
  setLoadingStocks = (val: boolean) => {
    this.loadingStocks = val;
  };
  setSuccess = (success: string) => {
    this.success = success;
  };
  setAllStocks = (res: any) => {
    this.stocks = res;
  };
  setSavedAssets=(res:any)=>{
    this.savedAssets=res;
  };
  setWishList=(res:any)=>{
    this.wishList=res;
  };
}