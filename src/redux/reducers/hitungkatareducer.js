const Initialstate={ 
    jumlahkata:0
}


export default (state=Initialstate,action)=>{
    switch (action.type) {
        case 'HITUNGKATA':
            return {...state,jumlahkata:action.payload}
        default:
            return state
    }
}


