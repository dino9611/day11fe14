import React, { Component } from 'react';
import Axios from 'axios'


class Comments extends Component {
    state = {
        Comments:[],
        post:{author:'',title:''}
    }
    
    componentDidMount(){
        Axios.get(`http://localhost:4000/comments?postId=${this.props.match.params.robin}`)
        .then((res)=>{
            Axios.get(`http://localhost:4000/posts/${this.props.match.params.robin}`)
            .then((res1)=>{
                this.setState({Comments:res.data,post:res1.data})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderComment=()=>{
        return this.state.Comments.map((val,index)=>{
            return(
                <div key={val.id}>
                    {val.body}
                </div>
            )
        })
    }
    render() {
        return (
            <div className='d-flex align-items-center flex-column pt-5'>
                <div>
                    name :{this.state.post.author}
                </div>
                <div>
                    title:{this.state.post.title}
                </div>
                {this.renderComment()}
            </div>
        );
    }
}
 
export default Comments;