import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {

    onSongDelete(id){
        this.props.mutate({variables: {id}})
        .then(()=> this.props.data.refetch())
    }
    renderSongs(){
        return this.props.data.songs && this.props.data.songs.map((song, index)=> <li className="collection-item" key={index}> <Link to={`/songs/${song.id}`}> {song.title} </Link> <i className="material-icons"
        onClick={()=> this.onSongDelete(song.id)}
        >delete</i></li>)
    }
    render(){
        
        return(
        <div>
            <ul className="collection">
                {this.renderSongs()}
            </ul>
            <Link
                className="btn-floating btn-large red right"
                to="songs/new"
            >
                <i className="material-icons">add</i>
            </Link>
        </div>
            
        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID){
        deleteSong(id: $id){
            id
        }
    }`

export default graphql(mutation)(graphql(query)(SongList));