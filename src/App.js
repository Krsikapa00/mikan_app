import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navigation from './components/Navigation/Navigation';
import PunchForm from './components/PunchForm/PunchForm';
import Menu from './components/Menu/Menu';
import History from './components/History/History';
import PunchRecipt from './components/PunchForm/PunchRecipt';
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
      this.setState({route:'punchform'})
    }
    else if (route === 'punchrecipt'){
      this.setState({route:'punchrecipt'})
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
          ?<Menu onRouteChange={this.onRouteChange} punchIn_Out={this.punchIn_Out} />
          :(
            route === 'punchform'
            ?<PunchForm in_out={in_out} onRouteChange={this.onRouteChange}  />
            :(
              route === 'history'
              ?<History />
              :(
                route === 'signin'
                ?<SignIn onRouteChange={this.onRouteChange}/>
                :<PunchRecipt />
              )
            )
          )
        }
      </div>
    );
  }
}

export default App;
