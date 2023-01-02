import React, {setState} from 'react';
import axios from 'axios';
import './songrecs.css';
import './favorites.css';
import HomeButton from './HomeButton';
import LogoutButton from './LogoutButton';

class SongRecs extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            recommendedSongs: []
        };
 
        axios.get('https://diversify-server.herokuapp.com/api/generate')
        .then((res) => {
            this.setState({recommendedSongs: res.data.data});
            console.log(this.state);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <h1 className="songrecs-header"> Song Recommendations </h1>
                <HomeButton></HomeButton>
                <LogoutButton></LogoutButton>
                <div className="favorites-songs-container">
                    <table>
                    {this.state.recommendedSongs.map(item => 
                    <tr className="favorites-song-card">
                        <td>
                            {item.key}. <a href={`/song/${item._id}`}>{item.name}</a>  -   {item.artist}
                        </td>
                    </tr>)}
                    </table>
                </div>
            </div>
        )
    }
}

export default SongRecs;