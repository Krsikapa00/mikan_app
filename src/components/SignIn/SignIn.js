import React from 'react';
import Inputbar from '../Inputbar';
import Submitbtn from '../Submitbtn';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInName: '',
            signInPassword: '',
        }
    }

    onNameChange = (event) => {
        this.setState({signInName: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    

    onSubmitSignIn = () => { 
        fetch('https://mikan-app-api.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name : this.state.signInName,
                password : this.state.signInPassword,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        .catch(err => console.log(err));
        
    }

    render(){
        
        return(
        <div>
           
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <form id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>

                            <Inputbar label='Name' type="text" id="name" placeholder= "Enter Name" onChange={this.onNameChange} />

                            <Inputbar label='Password' type="password" id="password" placeholder= "Enter Password" onChange={this.onPasswordChange} />
                            
                        </form>
                        <Submitbtn value="Sign in" onClick={this.onSubmitSignIn} />
                    </div>
                </main>
            </article>
        </div>
    )}
}

export default SignIn;