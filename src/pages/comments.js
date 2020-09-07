import React, { Component } from 'react';


class Comments extends Component {
    state = {  }
    render() { 
        return (
            <div>
                {this.props.match.params.robin}
            </div>
          );
    }
}
 
export default Comments;