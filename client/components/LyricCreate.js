import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';

class LyricCreate extends Component {

    constructor(props){
        super(props);
        this.state = {
            content: ""
        }
    }

    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        })

    }

    render(){
        
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a lyric</label>
                <input name="content" value={this.state.content} onChange={this.handleChange.bind(this)}/>
            </form>
        )
    }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID){
    addLyricToSong(content: $content, songId: $songId){
        id
        lyrics {
            id
            content
            likes
        }
    }
}`


export default graphql(mutation)(LyricCreate);