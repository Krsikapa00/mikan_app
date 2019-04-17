import React from 'react';
import Singlepunch from '../Singlepunch';

const Adminlastpunch = ({adminlist}) => {


    async function getAdminLastPunch (userarr) {
        
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
            } else {
                return ('Did not work')
            }
        }) 
        
        const results = await Promise.all(promises);
        console.log(results)
        return results;


        
    }

    if (adminlist[0]){
        let adminarr =[];
        getAdminLastPunch(adminlist).then(newarr => adminarr = newarr)

            return (
                <div>
                    {adminarr.map(function(data,i) {
                        return(
                            <article className="mw5 center bg-lavender br3 pa3 pa4-ns mv3 ba b--black-10">
                                <div className="tc">
                                    <h1 className="f4">{`${data.name}`}</h1>
                                    <hr className="mw3 bb bw1 b--black-10" />
                                </div>
                                    <label className="db">{`Last Punch`}</label>
                                    {/* <Singlepunch punch={data} /> */}
                            </article> 
                        )
                    })}
                </div>
            )
        
    }

    
}

export default Adminlastpunch;