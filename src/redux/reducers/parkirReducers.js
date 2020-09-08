const INITIAL_STATE={
    jam:0,
    kendaraan:'',
    biaya:0
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'Parkir':
            // return {...state,...action.payload}
            return {...state,jam:action.payload.jam,kendaraan:action.payload.kendaraan,biaya:action.payload.biaya}
        default:
            return state
    }
}