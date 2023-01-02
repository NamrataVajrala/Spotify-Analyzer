import React from 'react';
import axios from 'axios';
import './welcome.css';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link, Switch
} from "react-router-dom";
import Favorites from './Favorites';
import Search from './Search';
import SongRecs from './SongRecs';
import LogoutButton from './LogoutButton';

class Welcome extends React.Component {
    

    constructor(props){
        //needs to include user information somehow
        super(props);

        this.state = {
            user_email: "hello1",
            user_name: "hello2"
        }

        axios.get('https://diversify-server.herokuapp.com/api/current-user')
        .then((res) => {
            this.setState({
                user_email: JSON.parse(res.data.data).email
                // user_email: "ally@gmail.com"
            })

            // console.log(this.state.user_email);
            axios.get('https://diversify-server.herokuapp.com/api/users/'+this.state.user_email).then((res) => {
                console.log(res.data.data.name);
                this.setState({
                    user_name: res.data.data.name
                })
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });

        
    }

    render() {
        return (
            <div>
                <div className="welcome-body">
                        <h1 className="welcome-header">Welcome {this.state.user_name}!</h1>
                        <LogoutButton></LogoutButton>
                        <Link to="/Favorites">
                            <button className="welcome-favorite-button">Favorites</button>
                        </Link>
                        
                        <div className="welcome-buttons-container">
                            <Link to="/Search" className="welcome-button">
                                <button className="welcome-button">Search</button>
                            </Link>
                            <Link to="/SongRecs" className="welcome-button">
                                <button className="welcome-button">Recommend</button>
                            </Link>
                        </div>
                    </div>
                {/* <Routes>
                    <div className="welcome-body">
                        <h1 className="welcome-header">Welcome {this.state.user_name}!</h1>
                        <Link to="/Favorites">
                            <button className="welcome-favorite-button">Favorites</button>
                        </Link>
                        
                        <div className="welcome-buttons-container">
                            <Link to="/Search">
                                <button className="welcome-button">Search</button>
                            </Link>
                            <Link to="/SongRecs">
                                <button className="welcome-button">Recommend</button>
                            </Link>
                        </div>
                    </div>

                    <Route path='/Favorites' render={() => { return <Favorites /> }} />

                    <Route path='/Search' render={() => { return <Search /> }} />

                    <Route path='/SongRecs' render={() => { return <SongRecs /> }} />
                </Routes> */}


                <Routes>
                    <Route path='/Favorites' render={() => { return <Favorites /> }} />
                    <Route path='/Search' render={() => { return <Search /> }} />
                    <Route path='/SongRecs' render={() => { return <SongRecs /> }} />
                </Routes>
                {/* <Switch>
                    <Route path='/Favorites'>
                        <Favorites/>
                    </Route>
                        {/* </Route> render={() => { return <Favorites /> }} /> */}
                    {/* <Route path='/Search' render={() => { return <Search /> }} />
                    <Route path='/SongRecs' render={() => { return <SongRecs /> }} />
                </Switch> */}
                
            </div>

        )
    }
}

export default Welcome;