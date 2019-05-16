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
        fetch(`https://mikan-app-api.herokuapp.com/loadusers`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.props.user.id,
            admin: this.props.user.admin
        })
    })
    .then(response => response.json())
    .then(usersarray =>{
        console.log(usersarray)
        this.setState({adminlist: usersarray});
    })
    .catch(err => console.log(err));
    }

    

    loadlocarr = () =>{
        fetch(`https://mikan-app-api.herokuapp.com/locationsload`, {
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

    getActualDate = (punch_Date) => {
        let actual_date = new Date(punch_Date);
        actual_date.setDate(actual_date.getDate() + 1)
        return actual_date;
    }

    onRouteChange = () => {
        const user = document.getElementById('select_user').value.split(",");
        //Location variable is an array with place 0 being code and 1 being name
        const location = document.getElementById('select_location').value.split(",");
        const in_date = document.getElementById('in_date').value;
        const in_time = document.getElementById('in_time').value;
        const out_date = document.getElementById('out_date').value;
        const out_time = document.getElementById('out_time').value;
        const actual_in_date = this.getActualDate(in_date);
        const actual_out_date = this.getActualDate(out_date);

        if (!user  || !in_date || !in_time || !location) {
            console.log('Incorrect submission')
        } else {
            fetch('https://mikan-app-api.herokuapp.com/recordpunchmanual', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user[0],
                    location: location[0],
                    locationname: location[1],
                    in_date: in_date,
                    in_time: in_time,
                    out_date: out_date,
                    out_time: out_time,
                    actual_in_date: actual_in_date,
                    actual_out_date: actual_out_date

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
            .catch(err => console.log("err"));

        }


        //console.log(user[1])
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
                                    <label className='b ssftn5' >Locaout_timetion </label>
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
                                
                                <Inputbar label='In Date' id='in_date' type='date' />
                                <Inputbar label='In Time' id='in_time' type='time' />

                                <Inputbar label='Out Date' id='out_date' type='date' />
                                <Inputbar label='Out Time' id='out_time' type='time' />

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