import React from 'react';
import QrReader from 'react-qr-reader';
import Inputbar from '../Inputbar';
import Submitbtn from '../Submitbtn';

class Add extends React.Component {
    constructor(){
        super();
        this.state = {
           newname: '',
           newcode: '',
           newaddress: '',
           active: false
        }
    }

    handleError = (err) => {
        console.error(err)
    }

    handleScan = (data) => {
        if (data !== null) {
            const code = document.getElementById('newpassword')
            code.value = data;
            this.setState({newcode:data})
            console.log(data)
        }
    }

    onNameChange = (event) => {
        this.setState({newname: event.target.value})
    }

    onCodeChange = (event) => {
        this.setState({newcode: event.target.value})
        console.log(this.state.newcode)
    }

    onAddressChange = (event) => {
        this.setState({newaddress: event.target.value})
    }

    onActiveChange = (event) => {
        const box = document.getElementById('checkbox');
        
        if (box.checked){
            this.setState({active: true })
        } else {
            this.setState({active: false })
        }
    }

    onAddLocation = () => { 
        fetch('https://mikan-app-api.herokuapp.com/locationadd', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name : this.state.newname,
                code : this.state.newcode,
                address: this.state.newaddress,
                active: this.state.active
            })
        })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if (user.id) {
                this.props.onReload(`editlocations`);
            }
        })
        .catch(err => console.log(err));
        
    }

    render(){
        return (
            <div> 
                <label className="db fw6 lh-copy f3" > Scan New code here </label>
                <QrReader
                    className = 'center'
                    delay={200}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '35%' }}
                />
                <form className="measure center">
                    <div id="sign_up" className="ba b--transparent ph0 mh0">
                        <label className="f4 fw6 ph0 mh0">{"Add Location"}</label>
                        <Inputbar label='Name' type="text" id="newname" placeholder= "New name" onChange={this.onNameChange}/>

                        <Inputbar label='Password/Code' type="text" id="newpassword" placeholder= "New password/code" onChange={this.onCodeChange} />

                        <Inputbar label='Address' type="text" id="newaddress" placeholder= "New address" onChange={this.onAddressChange}/>

                        <label className="pa0 ma0 lh-copy f6 pointer"><input id='checkbox' type="checkbox" onClick={this.onActiveChange}/> Active?</label>

                        <Submitbtn value="Add Location" onClick={this.onAddLocation} />
                    </div>
                </form>
            </div>
        )
    }
}

export default Add;