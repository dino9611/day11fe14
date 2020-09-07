import React, { Component,createRef } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios'
import {MdAddCircleOutline,MdDeleteForever} from 'react-icons/md'
class Home extends Component {
    state = {
        datapost:[],
        inputauthor:createRef(),
        inputtitle:createRef()  
    }

    componentDidMount(){
        axios.get('http://localhost:4000/posts')
        .then((res)=>{
            this.state.inputauthor.current.focus()
            this.setState({datapost:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderPost=()=>{
        return this.state.datapost.map((val,index)=>{
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.author}</td>
                    <td>{val.title}</td>
                    <td>
                        <button className='btn btn-danger'> <MdDeleteForever/></button>
                    </td>
                </tr>
            )
        })
    }

    addPostClick=()=>{
        var author=this.state.inputauthor.current.value
        var title=this.state.inputtitle.current.value
        axios.post('http://localhost:4000/posts',{
            author,
            title:title
        }).then(()=>{
            axios.get('http://localhost:4000/posts')
            .then((res1)=>{
                var authorref=this.state.inputauthor
                authorref.current.value=''
                var titleref=this.state.inputtitle
                titleref.current.value=''
                this.state.inputauthor.current.focus()
                this.setState({datapost:res1.data})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    onKeyUphandler=(e)=>{
        if(e.keyCode===13){
            this.state.inputtitle.current.focus()
        }
    }
    onkeyupTitle=(e)=>{
        if(e.keyCode===13){
            this.addPostClick()
        }
    }
    render() {
        console.log(this.state.datapost) 
        return (
            <div className='d-flex align-items-center flex-column pt-5'>
                <h1>List buku perpustakaan konohagakure</h1>
                <div className='d-flex align-items-center flex-column'>
                    <input type='text' ref={this.state.inputauthor} onKeyUp={this.onKeyUphandler} className='form-control mb-3' placeholder='author'/>
                    <input type='text' ref={this.state.inputtitle} onKeyUp={this.onkeyupTitle} className='form-control mb-3' placeholder='title'/>
                    <button onClick={this.addPostClick} className='btn btn-outline-primary mb-3' style={{width:'60%'}}>
                        <MdAddCircleOutline style={{fontSize:'22'}}/> Add 
                    </button>
                </div>
                <div style={{width:'40%'}}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>NO.</th>
                                <th>Author</th>
                                <th>Judul</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPost()}
                        </tbody>
                    </Table>
                </div>
            </div>
          );
    }
}
 
export default Home;