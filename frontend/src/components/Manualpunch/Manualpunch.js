import React from 'react';
import Submitbtn from '../Submitbtn';
import Inputbar from '../Inputbar';
import PunchRecipt from '../PunchForm/PunchRecipt';

class Manualpunch extends React.Component {
    constructor(){
        super();
        this.state = {
            locationarr: [],
            adminlist: [],
            punch: {},
            route: 'punch',
            userpunch: {},
        }
    }

    getadminlist = () =>{
        fetch(`http://localhost:3000/loadusers`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.props.user.id,
            admin: this.props.user.admin
        })
    })
    .then(response => response.json())
    .then(usersarray =>{
        this.setState({adminlist: usersarray});
    })
    .catch(err => console.log(err));
    }

    loadlocarr = () =>{
        fetch(`http://localhost:3000/locationsload`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then(response => response.json())
        .then(locarr =>{
            if (locarr[0].id){
            this.setState({locationarr: locarr})
            } else {
                console.log(locarr)
            }
        })
        .catch(err => console.log(err));
    }

    onRouteChange = () => {
        const user = document.getElementById('select_user').value.split(",");
        //Location variable is an array with place 0 being code and 1 being name
        const location = document.getElementById('select_location').value.split(",");
        const in_out = document.getElementById('select_inout').value; 
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!user || !in_out || !date || !time || !location) {
            console.log('Incorrect submission')
        } else {
            fetch('http://localhost:3000/recordpunch', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user[0],
                    location: location[0],
                    in_out: in_out,
                    locationname: location[1],
                    date: date,
                    time: time

                })
            })
            .then(response => response.json())
            .then(punch => {
                // eslint-disable-next-line
                if (punch.id == user[0]) {
                    this.setState({userpunch:{name:user[1]}, route:'recipt', punch: punch });
                    const button = document.getElementById('submit');
                    button.disabled = true;
                } else {
                    console.log('punch')
                }
            })
            .catch(err => console.log(err));

        }


        console.log(user[1])
    }

    componentDidMount() {
        this.loadlocarr();
        this.getadminlist();
        console.log(this.state.adminlist);
    }

    render() {
        const { adminlist, locationarr } = this.state;

        if (this.state.route === 'punch') {
            return(
                <div>
                    <article className="br3 ba b--black-10 mv4 w-100 mw6 shadow-5 center">
                        <main className="pa4 black-80">
                            <form id="manual_punch" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0 center bb">Manual Punch</legend>
                                <div className='m4 w-70 center '>
                                    <label className='b ssftn5' >User </label>
                                    <select id='select_user' className='w-100 hover-bg-black hover-white bg-transparent b ba b--black' >
                                        {
                                            adminlist.map(function(data,i){
                                                return(
                                                    //NEED TO ADD KEY VALUES THAT ARE UNIQUE
                                                <option className='pa2' value={[data.id,data.name]}>{data.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='m4 w-70 center '>
                                    <label className='b ssftn5' >Location </label>
                                    <select id='select_location' className='w-100 hover-bg-black hover-white bg-transparent b ba b--black' >
                                        {
                                            locationarr.map(function(data,i){
                                                return(
                                                    //NEED TO ADD KEY VALUES THAT ARE UNIQUE
                                                    <option className='pa2 ' value={[data.code,data.name]}>{data.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='m4 w-70 center '>
                                    <label className='b ssftn5' >In or Out? </label>
                                    <select id='select_inout' className='w-100 hover-bg-black hover-white bg-transparent b ba b--black' >
                                        <option className='pa2 ' value={'In'}>IN</option>
                                        <option className='pa2 ' value={'Out'}>OUT</option>
                                    </select>
                                </div>

                                <Inputbar label='Date' id='date' type='date' />
                    
                                <Inputbar label='Time' id='time' type='time' />

                                <Submitbtn id='submit' value='Add Punch' onClick={this.onRouteChange} className='w-30' />
                            </form>
                        </main>
                    </article>
                </div>
            )
        } else if (this.state.route === 'recipt') {
            console.log(this.state.userpunch)
            return(
            <PunchRecipt punch={this.state.punch} user={this.state.userpunch} />
            )
        }
    }
}

export default Manualpunch;