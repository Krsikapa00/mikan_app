import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navigation from './components/Navigation/Navigation';
import PunchForm from './components/PunchForm/PunchForm';
import Menu from './components/Menu/Menu';
import EditUsers from './components/EditUsers/EditUsers';
import History from './components/History/History';
import Locations from './components/Locations/Locations';
import Register from './components/Register/Register';
import PunchRecipt from './components/PunchForm/PunchRecipt';
import './App.css';

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
      punch: {
        id: '',
        in_out: '',
        location: '',
        date: '',
        time: ''
    },
    historyarray:[],
  }}

  punchSubmit = (data) =>{
    const { location, date, inout, id, time } = data;
    this.setState({
      punch:{
        location: location,
        in_out: inout,
        date: date,
        time: time,
        id: id
    }});
    this.onRouteChange('punchrecipt');
  } 

  // historyarr = () => {
  //   fetch(`http://localhost:3000/history`, {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify({
  //           id: this.state.user.id
  //       })
  //   })
  //   .then(response => response.json())
  //   .then(puncharray =>{
  //       this.setState({historyarray: puncharray});
  //   })
  //   .catch(err => console.log(err));
  //   }

  editUsersArr = () =>{

    fetch(`http://localhost:3000/edituserslist`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.state.user.id,
            admin: this.state.user.admin,
        })
    })
    .then(response => response.json())
    .then(usersArray =>{
        this.setState({editUsersarray: usersArray})
        
    })
    .catch(err => console.log(err));
  }
 

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      admin: user.admin 
    }})
  }

  punchIn_Out = (punch) => {
    if (punch === 'In'){
      this.setState({punch:{in_out: 'IN'}})
    }
    if (punch === 'Out'){
      this.setState({punch:{in_out: 'OUT'}})
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
    // else if (route === 'history'){
    //   this.historyarr();
    // }
    else if (route === 'editusers'){
    }
    else if (route === 'editlocations'){
    }
    
  this.setState({route: route})  
  }

  render() {
    const { route, isSignedIn, punch, user, historyarray } = this.state;
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
                onRouteChange={this.onRouteChange}
                onSubmitInfo={this.onSubmitInfo} 
                punchSubmit={this.punchSubmit}
                />
              :(
                route === 'history'
                  ?<History user={user} historyarray={historyarray} />
                  :(
                    route === 'signin'
                      ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                      :(
                        route === 'punchrecipt'
                          ?<PunchRecipt punch={punch} user={user} />
                          :(
                            route === 'register'
                              ?<Register user={user} onRouteChange={this.onRouteChange} />
                              :(
                                route === 'editusers'
                                  ?<EditUsers user={user} onRouteChange={this.onRouteChange} />
                                  :(
                                    route === 'editlocations'
                                      ?<Locations user={user} onRouteChange={this.onRouteChange}/>
                                      :<div>YOU MESSED UP</div>
                                  )
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
