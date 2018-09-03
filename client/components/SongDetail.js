import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

import fetchSong from '../queries/fetchSong';

class SongDetail extends Component {

  onSubmitLyric(e){
    e.preventDefault();
    this.props.mutate({
        variables: {
            lyric: this.state.lyric
        },
        refetchQueries: [{
            query
        }]  
    })
    .then(()=>{
        hashHistory.push('/');
    })

}

  render() {
    const { song } = this.props.data
    return (
      <div>
        <Link to="/">Back</Link>
        {
          song && <div>
            <h3>{song.title}</h3>
            <LyricList lyrics={song.lyrics}/>
            <LyricCreate songId={song.id}/>
          </div>
        }
      </div>
    )
  }
}



export default graphql(fetchSong, {
  options: (props) => {
    return {
      variables: { id: props.params.id }
    }
  }
})(SongDetail);