import React from 'react';
import axios from 'axios';
import './favorites.css';
import HomeButton from './HomeButton';
import LogoutButton from './LogoutButton';

class Favorites extends React.Component {
    //prolly need to pass in favorites list through props? or query when loading
    constructor(props){
        super(props);
        
        this.state = {
            favoriteSongs: []
        }

        axios.get('https://diversify-server.herokuapp.com/api/favorites')
        .then((res) => {
            this.setState({favoriteSongs: res.data.data});
            console.log(this.state);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return(
            <div className="favorites-body">
                <div className="favorites-header">Favorites</div>
                <HomeButton></HomeButton>
                <LogoutButton></LogoutButton>

                <h3 className="favorites-description">Here are all your favorite songs so far!</h3>
                <div className="favorites-songs-container">
                    <table>
                        {this.state.favoriteSongs.map(item => 
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

export default Favorites;