import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navigation from './components/Navigation/Navigation';
import PunchForm from './components/PunchForm/PunchForm';
import Menu from './components/Menu/Menu';
import History from './components/History/History';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false,
      in_out: '',
    }
  }








 



  onRouteChange = (route) => {
    if (route === 'punchIn' || route === 'punchOut'){
      if(route === 'punchIn'){
        this.setState({in_out: 'IN'})
      }else {
        this.setState({in_out: 'OUT'})
      }
      this.setState({route:'punchform'})
    }
    else if(route === 'home'){
      this.setState({
        isSignedIn: true, 
        route: route});
        
    } 
    else if(route === 'signin'){
      this.setState({
        isSignedIn: false,
        route: route});
    } 
    else {
      this.setState({route: route})
    }
  }



  render() {
    const { route, isSignedIn, in_out } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home'
          ?<Menu onRouteChange={this.onRouteChange} />
          :(
            route === 'punchform'
            ?<PunchForm in_out={in_out}  />
            :(
              route === 'history'
              ?<History />
              :<SignIn onRouteChange={this.onRouteChange}/>
            )
          )
        }
      </div>
    );
  }
}

export default App;
