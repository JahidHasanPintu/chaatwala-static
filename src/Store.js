import { createStore } from 'redux';
import cartreducer from './redux/reducers/reducer';
const Store = createStore(
    cartreducer
) 

export default Store;