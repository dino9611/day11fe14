import React, { Component,createRef } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios'
import {MdAddCircleOutline,MdDeleteForever} from 'react-icons/md'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'
const MySwal = withReactContent(Swal)

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
                        <Link to={`/comments/${val.id}`}>
                            <button className='btn btn-primary'>Comment</button>
                        </Link>
                        <button className='btn btn-danger' onClick={()=>this.DeletePostid(val.id,index)}> <MdDeleteForever/></button>
                    </td>
                </tr>
            )
        })
    }

    DeletePostid=(id,index)=>{
        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.datapost[index].author} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete(`http://localhost:4000/posts/${id}`)
                .then(()=>{
                    axios.get('http://localhost:4000/posts')
                    .then((res)=>{
                        this.setState({datapost:res.data})
                        MySwal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )
                    }).catch((err)=>{
                        console.log(err)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }
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
                    <button onClick={this.addPostClick} className='btn btn-outline-success mb-3' style={{width:'60%'}}>
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