import React from 'react';
import Submitbtn from '../Submitbtn';
import Inputbar from '../Inputbar';


class Addus extends React.Component{
    constructor(){
        super();
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
        } else {
            this.setState({registerAdmin: false })
        }
    }

    onRegister = () => { 
        fetch('http://localhost:3000/userregister', {
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
                this.props.onReload(`editusers`);
            }
        })
        .catch(err => console.log(err));
        
    }
    
    render(){
    
    return (
        <div>
            <article className="br3 ba b--black-10 mv4 w-100 mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <form id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 center bb">Register</legend>
                            
                            
                            <Inputbar label='Name' type="text" id="Name" placeholder= "New users name" onChange={this.onNameChange} />
                            <Inputbar label='Password' type="password" id="password" placeholder= "New users password" onChange={this.onPasswordChange} />
                            
                            <label className="pa0 ma0 lh-copy f6 pointer"><input id='checkbox' type="checkbox" onClick={() => this.onAdminChange(this)}/> Admin User?</label>
                            
                            <Submitbtn value="Register User" onClick={this.onRegister} className='w-30'/>
                        
                        </form>
                    </div>
                </main>   
            </article>  
        </div>
    
    )
    }
}

export default Addus;