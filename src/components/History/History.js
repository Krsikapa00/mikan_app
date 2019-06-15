import React from 'react';
import './History.css';
import HistoryNav from './HistoryNav';
import Submitbtn from '../Submitbtn'
import Excelexport from './Excelexport';
import Deleteform from '../Deleteform';

class History extends React.Component {
    constructor(){
        super();
        this.state = {
            adminlist: [],
            historyarray: [],
            searchedusername:'',
            route: 'main',
            deletedPunch: {},
        }
    }
    
    username =(name) => {
        this.setState({searchedusername:name})
    }

    onReload = () => {
        this.setState({route: 'main', deletedPunch:{}, historyarray: []})
        this.historyarr();
        this.props.onRouteChange('history');
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
        this.setState({adminlist: usersarray});
    })
    .catch(err => console.log(err));
    }

    historyarr = () => {
        fetch(`https://mikan-app-api.herokuapp.com/history`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
        .then(response => response.json())
        .then(puncharray =>{
            this.setState({historyarray: puncharray});
        })
        .catch(err => console.log(err));
    }

    getFilteredHistory = (id, start, end) => {
        fetch(`https://mikan-app-api.herokuapp.com/filteredhistory`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                start: start,
                end: end
            })
        })
        .then(response => response.json())
        .then(resp =>{
            const { puncharr, user } = resp;
            if (puncharr){            
            this.setState({historyarray: puncharr, searchedusername:user.name });
            } else {
                console.log('Something went wrong');
            }
        })
        .catch(err => console.log(err));
    }

    deletePunch = (punch) => {
        punch['name'] = this.state.searchedusername + "'s punch";
        this.setState({deletedPunch: punch, route:'delete'})
        // console.log(punch);
    }

    componentDidMount() {
        if(this.props.user.admin){
            this.getadminlist();
        }
        this.historyarr();
        this.setState({searchedusername: this.props.user.name})
    }

    render() {
        const { user } = this.props;
        const { historyarray, adminlist, route, deletedPunch } = this.state
        const { deletePunch, onReload} = this;

        
        if (route === 'main') {
                
            return(
                <div className="shadow-5 w-80 center">
                    <div> 
                        
                        <HistoryNav user={user} adminlist={adminlist} getFilteredHistory={this.getFilteredHistory} username={this.username} />
                    </div>
                    <div className="mt4 scrollable-table db table-cont ">
                        <table className="" cellSpacing="0" id='historyTable'>
                            <thead className=''>
                                <tr className=''>
                                    <th style={{display:"none"}} className=" ">User ID</th>
                                    <th className="pa3">Name</th>
                                    <th className="pa3">Location</th>
                                    <th colSpan='' className="pa3">In Date</th>
                                    <th className="pa3">InTime</th>
                                    <th className="pa3">Out Date</th>
                                    <th className="pa3">Out Time</th>
                                    <th className="pa3">Hours Worked</th>
                                    <th style={{display:"none"}} className=" ">Actual In Date</th>
                                    <th style={{display:"none"}} className=" ">Actual Out Date</th>
                                    
                                    {user.admin === true
                                    ?<th className=" ">Delete ?</th>
                                    :<div></div>}
                                </tr>
                            </thead>
                            <tbody className="">
                                {historyarray.map(function(data, i){
                                    if (data.out_date === null){
                                        data.out_date = '';
                                        data.actual_out_date = '';
                                        data.out_time = '';
                                    }
                                    return(
                                        //NEED TO ADD KEY VALUES THAT ARE UNIQUE
                                        <tr className='' >
                                            <td  style={{display:"none"}} className="">{data.id}</td>   
                                            <td  className="">{data.name}</td>
                                            <td  className="">{data.location}</td>
                                            <td  className="">{data.in_date.substring(0,10)}</td>
                                            <td  className="">{data.in_time.substring(0,8)}</td>
                                            <td  className="">{data.out_date.substring(0,10)}</td>
                                            <td  className="">{data.out_time.substring(0,8)}</td>
                                            <td  className="">{data.difference/60}</td>
                                            <td  style={{display:"none"}} className="">{data.actual_in_date.substring(0,10)}</td>
                                            <td  style={{display:"none"}} className="">{data.actual_out_date.substring(0,10)}</td>
                                            
                                            {user.admin === true
                                                ?<td key={'delete punch'}>
                                                    <Submitbtn  
                                                        value="Delete" 
                                                        onClick={() =>
                                                            deletePunch(data)}
                                                            className='pa4' />
                                                </td>                                            
                                                :<div></div>}
                                        </tr>
                                    )
                                })}
                            </tbody>
                           
                        </table>
                        <div className="w-80 center ma4 pa2 bt justify-between">
                            <div className=" f3 flex " >Total Hours:</div>
                            <div className=" f3 flex" >36</div>

                        </div>
                        
                    </div>
                    
                    <Submitbtn value='Export' onClick={() => Excelexport(document.getElementById('historyTable'), this.state.searchedusername)} />

                </div>
            )
        } else if (route === 'delete') {
            return (
                <Deleteform route={'punchdelete'} target={deletedPunch} onReload={onReload} />
                )
        }
    }
}

export default History;