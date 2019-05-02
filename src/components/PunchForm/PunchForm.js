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
    getTime = () => {
        const today = new Date();
        const date = (`${today.getHours()}:${(today.getMinutes())}:${today.getSeconds()}`);
        return date;
    }
    onRouteChange = () => {
        if (this.state.location !== ''){
            const date = this.getDate();
            const time = this.getTime();
            fetch('http://localhost:3000/recordpunch', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.props.user.id,
                    location: this.state.locationcode,
                    in_out: this.props.in_out,
                    locationname: this.state.location,
                    date: date,
                    time: time

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

    render() {
        const { in_out } = this.props;
        const curDate = this.getDate();

        if (this.state.route === 'punch') {
            return(
                <div>
                    <article className="br3 ba b--black-10 mv4 w-80 mw7 shadow-5 center">
                        <main className="pa4 black-80">
                            <QrReader
                                className = 'center'
                                delay={200}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{ width: '%' }}
                            />
                            <div className='fw6 lh-copy f3 bt ma3 pa4' >
                                <label className="db">{`Place: ${this.state.location}`}</label>
                                <label className="db">{`User: ${this.props.user.name}`} </label>
                                <label className="db">{`Date: ${curDate}`}</label>
                                <label className="db">{`In/Out: ${in_out}`}</label>
                            </div>
                            <Submitbtn id="submit" value="Punch" className='w-30' onClick={this.onRouteChange}/>
                        </main>
                    </article>
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