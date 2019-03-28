import React from 'react';


class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            registerName: '',
            registerPassword: '',
            registerAdmin: false,

        }
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onAdminChange = (event) => {
        const box = document.getElementById('checkbox');
        
        if (box.checked){
            this.setState({registerAdmin: true })
            console.log(this.state.registerAdmin);
        } else {
            this.setState({registerAdmin: false })
        }
    }

    onRegister = () => { 
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name : this.state.registerName,
                password : this.state.registerPassword,
                admin: this.state.registerAdmin
            })
        })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if (user.id) {
                this.props.onRouteChange('home');
            }
        })
        .catch(err => console.log(err));
        
    }




    render(){
    if (this.props.user.admin === true) {
    return (
        <div>
            <main className="pa4 black-80">
                <form className="measure center">
                    <div id="sign_up" className="ba b--transparent ph0 mh0">
                        <label className="f4 fw6 ph0 mh0">Register</label>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" >Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Name"  id="Name" placeholder='New users name' onChange={this.onNameChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" >Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder='New users password' onChange={this.onPasswordChange} />
                        </div>
                        <label className="pa0 ma0 lh-copy f6 pointer"><input id='checkbox' type="checkbox" onClick={() => this.onAdminChange(this)}/> Admin User?</label>
                    </div>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register User" onClick={this.onRegister} />
                    </div>
                </form>
            </main>     
        </div>
    )
    } else {
        return(
            <div>
                <p>You do not have access to this part of the site</p>
            </div>
        )
    }
    }
}

export default Register;