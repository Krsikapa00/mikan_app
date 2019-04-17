import React from 'react'
import QrReader from 'react-qr-reader';
import Submitbtn from '../Submitbtn';
import PunchRecipt from './PunchRecipt';


class PunchForm extends React.Component {
    constructor(){
        super();
        this.state = {
          location: '',
          locationcode: '',
          punch: {},
          route: 'punch'
        }
      }
    
    
    handleScan = (data) => {
        if (data !== null) {
            fetch('http://localhost:3000/locationscheck', {
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
            
            fetch('http://localhost:3000/recordpunch', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.props.user.id,
                    location: this.state.locationcode,
                    in_out: this.props.in_out
                })
            })
            .then(response => response.json())
            .then(punch => {
                // eslint-disable-next-line
                if (punch.id == this.props.user.id) {
                    this.setState({route:'recipt', punch: punch });
                    const button = document.getElementById('submit');
                    button.disabled = true;
                } else {
                    console.log('punch')
                }
            })
            .catch(err => console.log(err));
        
    }}
    // componentDidMount() {
    //     this.setState({route:'punch'})
    // }

    render() {
        const { in_out } = this.props;
        const curDate = this.getDate();

        if (this.state.route === 'punch') {
            return(
                <div>
                    <QrReader
                        className = 'center'
                        delay={200}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '35%' }}
                    />
                    <div className='fw6 lh-copy f3' >
                        <label className="db">{`Place: ${this.state.location}`}</label>
                        <label className="db">{`User: ${this.props.user.name}`} </label>
                        <label className="db">{`Date: ${curDate}`}</label>
                        <label className="db">{`In/Out: ${in_out}`}</label>
                    </div>
                    <Submitbtn id="submit" value="Punch" onClick={this.onRouteChange}/>
                    
                </div>    
            )
        } else if (this.state.route === 'recipt') {
            return (
                <PunchRecipt punch={this.state.punch} user={this.props.user} />
            )
        }
    }
}

export default PunchForm;