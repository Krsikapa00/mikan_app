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

    historyarr = () => {
        fetch(`http://localhost:3000/history`, {
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
        fetch(`http://localhost:3000/filteredhistory`, {
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
        console.log(punch);
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
                    <div className="mt4">
                        <table className="table-cont" cellSpacing="0" id='historyTable'>
                            <thead className=''>
                                <tr className=''>
                                    <th className=" ">Location</th>
                                    <th className=" ">In/Out</th>
                                    <th className=" ">Date</th>
                                    <th className=" ">Time</th>
                                    {user.admin === true
                                    ?<th className=" ">Delete ?</th>
                                    :<div></div>}
                                </tr>
                            </thead>
                            <tbody className="">
                                {historyarray.map(function(data, i){
                                    return(
                                        //NEED TO ADD KEY VALUES THAT ARE UNIQUE
                                        <tr className='' >
                                            <td className="">{data.location}</td>
                                            <td  className="">{data.inout}</td>
                                            <td  className="">{data.date.substring(0,10)}</td>
                                            <td  className="">{data.time.substring(0,8)}</td>
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