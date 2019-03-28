import React from 'react';
import './History.css';


class History extends React.Component {
    constructor(){
        super();
        this.state = {
        }
      }

    // historyarr = () => {
    // fetch(`http://localhost:3000/history`, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         id: this.props.user.id
    //     })
    // })
    // .then(response => response.json())
    // .then(puncharray =>{
    //     this.setState({array: puncharray});
    // })
    // .catch(err => console.log(err));
    // }

    

    render() {
        
        const { historyarray } = this.props;
        return(
            <div className="pa6">
                <div className="">
                    <table className="" cellSpacing="0">
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
                                    <tr className='' >
                                        <td key={i} className="">{data.location}</td>
                                        <td key={i} className="">{data.inout}</td>
                                        <td key={i} className="">{data.date}</td>
                                        <td key={i} className="">{data.time}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default History;