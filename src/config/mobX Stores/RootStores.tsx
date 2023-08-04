import { createContext } from 'react';
import { StockStores } from './StockStores';


interface StoreContextInterface {
  stockStore: StockStores;

}

const stockStore = new StockStores();


export const StoreContext = createContext<StoreContextInterface>({
  stockStore,
});
