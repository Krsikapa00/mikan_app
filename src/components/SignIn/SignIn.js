import React from 'react';

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
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <form id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange} 
                                />
                        </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={this.onPasswordChange}
                            />
                    </div>
                    </form>
                    <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={this.onSubmitSignIn} 
                            />
                    </div>
                </div>
            </main>
        </article>
    )}
}

export default SignIn;