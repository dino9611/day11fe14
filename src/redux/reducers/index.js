import {combineReducers} from 'redux'
import Hitungkatareducers from './hitungkatareducer'
import parkirReducers from './parkirReducers'
export default combineReducers({
    hitungkata:Hitungkatareducers,
    parkir:parkirReducers
})