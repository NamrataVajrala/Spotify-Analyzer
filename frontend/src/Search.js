import React, {setState} from 'react';
import axios from 'axios';
import './search.css';
import './favorites.css';
import HomeButton from './HomeButton';
import LogoutButton from './LogoutButton';

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchInput: '',
            songs: [],
            filteredSongs: []
        };

        this.setSearchInput = this.setSearchInput.bind(this);
        this.search = this.search.bind(this);

        axios.get('https://diversify-server.herokuapp.com/api/songs/')
        .then((res) => {
            // console.log(res)
            this.state.songs = res.data.data;
            console.log("original state", this.state);
        }).catch((err) => {
            console.log(err);
        });
    }
//need to display search data, some dummy data for now

    setSearchInput(event) {
        this.setState({searchInput: event.target.value});
    }

    search(event) {
        event.preventDefault();
        let tempFilteredSongs = this.state.songs.filter(song => (
          song.name.toLowerCase().includes(this.state.searchInput.toLowerCase())
        ));
        this.setState({filteredSongs: tempFilteredSongs});
        console.log("filtered state", this.state);
    }

    render() {
        return(
            <div className="search-body">
                <div>
                <div className="search-header">Search</div>
                <HomeButton></HomeButton>
                <LogoutButton></LogoutButton>
                </div>
                <div className="search-form">
                    <form>
                        <input className ="search-form-input" type="text" id="searchsong" name="searchsong" size="80" placeholder="Search for a song..." onChange={this.setSearchInput}></input>
                        <button className ="search-submit" onClick={(e) => this.search(e)}>Search</button>
                        <br/>
                    </form>
                </div>

                {/* <div class="outer" >
                    {
                    this.state.filteredSongs.map((song) => (
                        // console.log("bruh")
                        <div className="song-item">
                            <h1> <a href={`/song/${song._id}`}>{song.name}</a>  -   {song.artist}</h1>
                        </div>
                    ) )}
                </div> */}
                <div className="favorites-songs-container">
                    <table>
                        {this.state.filteredSongs.map(item => 
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

export default Search;