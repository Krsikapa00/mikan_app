import React from 'react';
import './History.css';
import ReactToExcel from 'react-html-table-to-excel';
import HistoryNav from './HistoryNav';


class History extends React.Component {
    constructor(){
        super();
        this.state = {
            adminlist: [],
            historyarray: [],
            searchedusername: '',
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
        .then(puncharray =>{
            if (puncharray[0]){
            const searchedusername = puncharray[0].name;
            this.setState({historyarray: puncharray, searchedusername: searchedusername });
            } else {
                console.log('Something went wrong');
                this.setState({historyarray: puncharray})
            }
        })
        .catch(err => console.log(err));
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
        const { historyarray, adminlist } = this.state
        return(
            <div className="shadow-5 w-80 center">
                <div> 
                    {/* Place drop down navigation to choose user specific user history and date range */}
                    <HistoryNav user={user} adminlist={adminlist} getFilteredHistory={this.getFilteredHistory} />
                </div>
                <div className="mt4">
                    <table className="table-cont" cellSpacing="0" id='historyTable'>
                        <thead className=''>
                            <tr className=''>
                                <th className=" ">Location</th>
                                <th className=" ">In/Out</th>
                                <th className=" ">Date</th>
                                <th className=" ">Time</th>
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
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <ReactToExcel
                    className="b textc mt4 mb4 sspd pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-20 center" 
                    table='historyTable'
                    filename={`${this.state.searchedusername} History File`}
                    sheet='Sheet 1'
                    buttonText='Export History'
                    />
            </div>
        )
    }
}


export default History;