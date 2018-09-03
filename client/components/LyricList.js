import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Link } from 'react-router';

class LyricList extends Component {

    onLike(id, likes){
        this.props.mutate({
            variables: {
                id
            },
            optimisticResponse: {
                __typename : 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })

    }

    renderLyrics(){
        return this.props.lyrics.map((lyric, index)=> <li className="collection-item" key={index}>  {lyric.content} 
       <div className="vote-box"><i className="material-icons"
        onClick={()=> this.onLike(lyric.id, lyric.likes)}
        >thumb_up</i>
        {lyric.likes}</div>
        </li>)
    }
    render(){
        
        return(
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
            
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID){
        likeLyric(id: $id){
            id
            likes
        }
    }`

export default graphql(mutation)(LyricList);