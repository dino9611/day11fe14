import React, { Component, createRef } from 'react';
import {connect} from 'react-redux'
import {HitungkataAction,parkiraction} from './../redux/actions'


class Hitungkata extends Component {
    state = { 
        jam:createRef(),
        kendaraan:createRef()
     }

    Hitungkatahandler=(e)=>{
        // ambil valuenya
        // hitungkatanya enga split dan yang string kosong difilter jangan masuk arraynya
        // terus arraynya di hitung panjangnya
        // dapetlah jumlah kata, dan kata akan dikirimkan ke reducer melalui action

        var kalimat=e.target.value
        var kata=kalimat.split(' ').filter((val)=>val!='')
        this.props.Hitungkataja(kata.length)

    }

    onbayarparkir=()=>{
        var jam =this.state.jam.current.value
        var kendaraan=this.state.kendaraan.current.value
        if(kendaraan==='1'){
            this.props.parkiraction({jam,kendaraan:'motor',biaya:1000})
        }else{
            this.props.parkiraction({jam:jam,kendaraan:'mobil',biaya:2000})
        }
    }
    render() { 
        return (
            <div className='pt-5 px-5'>
                <h1>Hitungkata</h1>
                <textarea className='form-control' onChange={this.Hitungkatahandler} cols="30" rows="10"></textarea>

                <input ref={this.state.jam} type="number" />
                <select ref={this.state.kendaraan}>
                    <option value="1">motor</option>
                    <option value="2">mobil</option>
                </select>
                <button className='btn btn-primary' onClick={this.onbayarparkir}>bayar</button>
            </div>
          );
    }
}
 
export default connect(null,{Hitungkataja:HitungkataAction,parkiraction}) (Hitungkata);