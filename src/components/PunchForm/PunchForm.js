import React from 'react'
import QrReader from 'react-qr-reader';


class PunchForm extends React.Component {
    constructor(){
        super();
        this.state = {
          location: '',
          locationcode: ''
        }
      }
    
    
    handleScan = (data) => {
        // if (data) {
        //     this.setState({location: data});
        // } else {
        //     this.setState({location: ''});
        // }
        if (data) {
            fetch('https://mikan-app-api.herokuapp.com/locationscheck', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        location: data
                    })
            })
            .then(response => response.json())
            .then(resp => {
                if (!resp.id) {
                    this.setState({location: ''});
                } else {
                    this.setState({location: resp.name, locationcode: resp.code});
                }
            })
            .catch(err => console.log(err));
        } else {
            this.setState({location: ''});
        }
    }

    handleError = (err) => {
        console.error(err)
    }

    getDate = () => {
        const today = new Date();
        const date = (`${today.getFullYear()}/${(today.getMonth()+1)}/${today.getDate()}`);
        return date;
    }

    onRouteChange = () => {
        if (this.state.location !== ''){
            
            fetch('https://mikan-app-api.herokuapp.com/recordpunch', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.props.user.id,
                    location: this.state.locationcode,
                    in_out: this.props.punch.in_out
                })
            })
            .then(response => response.json())
            .then(punch => {
                // eslint-disable-next-line
                if (punch.id == this.props.user.id) {
                    this.props.punchSubmit(punch);
                    const button = document.getElementById('submit');
                    button.disabled = true;
                    
                }
            })
            .catch(err => console.log(err));
        
    }}

    render() {
    const { in_out } = this.props.punch;
    const curDate = this.getDate();
    return(
        <div>
            <QrReader
                className = 'center'
                delay={200}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '500px' }}
            />
            <div className='fw6 lh-copy f3' >
                <label className="db">{`Place: ${this.state.location}`}</label>
                <label className="db">{`User: ${this.props.user.name}`} </label>
                <label className="db">{`Date: ${curDate}`}</label>
                <label className="db">{`In/Out: ${in_out}`}</label>
            </div>
            <div className="lh-copy w-20 center">
                <input 
                    id="submit"
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Punch"
                    onClick={this.onRouteChange}
                />
            </div>
        </div>    
    )
    }
}

export default PunchForm;