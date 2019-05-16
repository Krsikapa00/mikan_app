import React from 'react';
import Submitbtn from '../Submitbtn';
import Lastpunch from './Lastpunch';
import AdminLastpunch from './Adminlastpunch';


class Menu extends React.Component {
    constructor(){
        super();
        this.state = {
            latestpunch: {},
            adminlist: [],
        }
    }

    getUserList(adminuser){
        return fetch(`https://mikan-app-api.herokuapp.com/loadusers`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: adminuser.id,
                admin: adminuser.admin
            })
        })
        .then(response => response.json())
        .then(usersarray =>{
            // console.log(usersarray);
            this.setState({adminlist: usersarray}) 
            return usersarray;
        })
        .catch(err => console.log(err));
    }

    getLastPunch = (user) => {
        fetch(`https://mikan-app-api.herokuapp.com/latestpunch`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user.id,
            })
        })
        .then(response => response.json())
        .then(resp =>{
            if (resp.id) {
                this.setState({latestpunch:resp})
                // console.log(resp);
            } else {
                console.log(resp);
            }
        })
        .catch(err => console.log(err));
    }
    

    componentDidMount() {
        if (this.props.user.admin) {
            this.getUserList(this.props.user)
            .then(resp => {
                this.setState({adminlist:resp})
            })
        } else {
            this.getLastPunch(this.props.user)
        }
    }
    
    render(){
        let admin, adminready;
        const { onRouteChange, user, punchIn_Out } = this.props;
        const { latestpunch, adminlist } = this.state;

        if (user.admin){
            admin = (
                <div> 
                
                    <Submitbtn className='w' value="Manual Punch" onClick={() => onRouteChange('manualpunch')} />  

                    <Submitbtn className='w' value="Edit Users" onClick={() => onRouteChange('editusers')} />
              
                    <Submitbtn className='w' value="Locations" onClick={() => onRouteChange('editlocations')} />
                </div>
            )
            if (adminlist[0]) {
                adminready = (
                    <div>
                        <AdminLastpunch adminlist={adminlist} />
                    </div>
                )
            }
        }
        return(
            <div>
            <div className='br3 pa2 ba  mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center' >
            
                <div className='br3 w-100'>
                    <div className='w-100 black-80 '>
                        <Submitbtn className='w' value="Punch Out"
                            onClick={() => {
                                onRouteChange('punchform');
                                punchIn_Out('Out');
                            }} 
                        />
                        <Submitbtn className='w' value="Punch In"
                            onClick={() => {
                                onRouteChange('punchform');
                                punchIn_Out('In');
                            }}
                        />
                        <Submitbtn className='w' value="History" onClick={() => onRouteChange('history')} />
                
                        {admin}
                    </div>
                </div>
            </div>
            { user.admin == true
            ? adminready
            :   <Lastpunch punch={latestpunch} />
            }
            
            </div>
        )
    }
}

export default Menu;