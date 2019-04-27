import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navigation from './components/Navigation/Navigation';
import PunchForm from './components/PunchForm/PunchForm';
import Menu from './components/Menu/Menu';
import Users from './components/Users/Users';
import History from './components/History/History';
import Locations from './components/Locations/Locations';
import './App.css';
import Manualpunch from './components/Manualpunch/Manualpunch';

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        admin: false,
      },
      in_out: ''
  }}

 
 

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      admin: user.admin 
    }})
  }

  punchIn_Out = (punch) => {
    if (punch === 'In'){
      this.setState({in_out: 'IN'})
    }
    if (punch === 'Out'){
      this.setState({in_out: 'OUT'})
    }
  }

  onRouteChange = (route) => {
    if (route === 'punchform'){
    }
    else if (route === 'punchrecipt'){
    }
    else if(route === 'home'){
      this.setState({
        isSignedIn: true});
    } 
    else if(route === 'signin'){
      this.setState({
        isSignedIn: false
      });
    }
    
  this.setState({route: route})  
  }

  render() {
    const { route, isSignedIn, punch, user, in_out } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} user={user}/>
        { route === 'home'
          ?<Menu onRouteChange={this.onRouteChange} punchIn_Out={this.punchIn_Out} user={user} />
          :(
            route === 'punchform'
              ?<PunchForm 
                punch={punch} 
                user={user}
                in_out={in_out}
                />
              :(
                route === 'history'
                  ?<History user={user} onRouteChange={this.onRouteChange} />
                  :(
                    route === 'signin'
                      ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                      :(
                          route === 'editusers'
                            ?<Users user={user} onRouteChange={this.onRouteChange} />
                            :(
                              route === 'editlocations'
                                ?<Locations user={user} onRouteChange={this.onRouteChange}/>
                                :(
                                  route === 'manualpunch'
                                ?<Manualpunch user={user}  />
                                :<div>YOU MESSED UP</div>
                                )
                            )
                          
                      )
                  )
              )
          )
        }
      </div>
    );
  }
}

export default App;
