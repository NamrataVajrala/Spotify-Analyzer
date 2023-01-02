import React from 'react';
import './songDisplay.css';
import axios from "axios";
import {Link} from "react-router-dom";
import HomeButton from './HomeButton';
import LogoutButton from './LogoutButton';
// import {withRouter} from "react-router-dom";
import ReactPlayer from "react-player"

class SongDisplay extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            song_name:  " ",
            song_artist: " ",
            song_url: " ",
            userId: " ",
            songId: " "
        }

        axios.get('https://diversify-server.herokuapp.com/api/songs/')
            .then((res) => {
                let id = window.location.href;
                id = id.includes('/') && id.substr(id.lastIndexOf('/') + 1)
                axios.get('https://diversify-server.herokuapp.com/api/songs/'+id).then((res) => {
                    console.log(res.data.data.name);
                    this.setState({
                        song_name: res.data.data.name,
                        song_artist: res.data.data.artist,
                        song_url: res.data.data.videoURL,
                        songId: id
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
            console.log(err);
        });

        axios.get('https://diversify-server.herokuapp.com/api/current-user')
            .then((res) => {
                this.setState({
                    user_email: JSON.parse(res.data.data).email
                })

                // console.log(this.state.user_email);
                axios.get('https://diversify-server.herokuapp.com/api/users/'+this.state.user_email).then((res) => {
                    console.log(res.data.data._id);
                    this.setState({
                        userId: res.data.data._id
                    })
                }).catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
            console.log(err);
        });
    }

    async addToUserFavorites() {
        console.log(this.state.userId);
        console.log(this.state.songId);

        axios.put(('https://diversify-server.herokuapp.com/api/users/'+this.state.userId), {
            song: this.state.songId
        }).then(() => {
            alert("Added to your favorites!");
        }).catch((err) => {
            console.log(err);
        });

        axios.put(('https://diversify-server.herokuapp.com/api/songs/'+this.state.songId), {
            listener: this.state.userId
        }).catch((err) => {
            console.log(err);
        });

    }

    //add userId to the song's listeners
    //add songID to your favorite songs
    render() {
        return(
            <div>
                <div className="display-body">
                    <h1 className="display-header">{this.state.song_name} - {this.state.song_artist}</h1>
                    <ReactPlayer className="video"
                        url = {this.state.song_url}
                    />
                    {/* <video width="800" height="600" controls>
                        <source src={this.state.song_url} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video> */}
                <HomeButton></HomeButton>
                <LogoutButton></LogoutButton>
                    <button className="song-favorite-button" onClick={() => this.addToUserFavorites()}>Add to Favorites</button>
                </div>
            </div>
        );
    }
}

export default SongDisplay;
