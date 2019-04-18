import React from 'react';
import Singlepunch from '../Singlepunch';

class Adminlastpunch  extends React.Component {
    constructor(){
        super();
        this.state = {
            adminarr: [],
        }
    }


    getAdminLastPunch = async (userarr) => {
        
        const promises = userarr.map(async data => {
            const response = await fetch(`http://localhost:3000/latestpunch`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: data.id,
                })
            }).then(resp => resp.json())
            .catch(err => console.log(err))


            if (response.id){
            return {
                id: response.id,
                name: data.name,
                date: response.date,
                location: response.location,
                time: response.time,
                inout: response.inout
            } 
            }else {
               console.log('Something went wrong') 
            }
        }) 
        
        const results = await Promise.all(promises);
        return results;
    }

    componentDidMount() {
        this.getAdminLastPunch(this.props.adminlist)
        .then(newarr => {this.setState({adminarr:newarr})})
    }

    render() {
        const { adminarr } = this.state;
        if (adminarr[0]){
                return ( 
                    <div className={'overflow-x-auto overflow-y-hidden nowrap '}>
                       
                            {adminarr.map(function(data,i) {
                                return(
                                    <article className=" lastpunch bg-lavender br3 pa3 pa4-ns ma3 ba b--black-10 dib">
                                        <div className="tc">
                                            <h1 className="f4">{`${data.name}`}</h1>
                                            <hr className="mw3 bb bw1 b--black-10" />
                                        </div>
                                            <label className="db">{`Last Punch`}</label>
                                            <Singlepunch punch={data} />
                                    </article> 
                                )
                            })}
                        
                    </div>
                ) 
        }
        else {
            return(
                <div></div>
            )
        }
    }
}

export default Adminlastpunch;