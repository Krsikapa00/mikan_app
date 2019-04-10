import React from 'react';
import Edit from '../EditUsers/Edit.js';
import Add from './Add';

class Locations extends React.Component {
    constructor(){
        super();
        this.state = {
            route: 'main',
            locationarr: [],
            singleloc: {},
            db: ''
        }
    }
    onRouteChange = (route, database, user) =>{
        this.setState({route: route, singleloc:user, db:database})
    }
    
    onReload = (route) => {
        this.setState({route: 'main', singleuser:{}, userarr: []})
        this.loadlocarr();
        this.props.onRouteChange(route);
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

    


    componentDidMount() {
        this.loadlocarr();
        
    }

    
    render(){
        const { onRouteChange } = this;
        const { route, singleloc, locationarr, db } = this.state;

        if (route === 'main'){
            return(
                <div>
                    <div className='w-70 flex justify-end' style={{marginLeft:'auto', marginRight:'auto'}}>
                        <input 
                            className=" ma4 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                            type="button" 
                            value="Add Location" 
                            onClick={() =>
                                onRouteChange("add",'locations', '')} />
                    </div>
                    <div className='table-cont' > 
                        
                        <table className="" cellSpacing="0" id='historyTable'>
                                <thead align='' className='' >
                                    <tr className=''>
                                        <th className=" ">ID</th>
                                        <th className=" ">Location Name</th>
                                        <th className=" ">Location Code</th>
                                        <th className=" ">In Use?</th>
                                        <th colSpan='2' className=" ">Edit Locations</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {locationarr.map(function(data, i){
                                        return(
                                            <tr className='' >
                                                <td key={'id'} className="">{data.id}</td>
                                                <td key={'name'} className="">{data.name}</td>
                                                <td key={'code'} className="">{data.code}</td>
                                                <td key={'active'} className="">{`${data.active}`}</td>
                                                <td key={'editlocation'}>
                                                    <input 
                                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                                                        type="button" 
                                                        value="Edit Location" 
                                                        onClick={() =>
                                                            onRouteChange("edit", 'locations', data)} />
                                                </td>
                                            
                                                <td key={'deletelocation'}>
                                                    <input 
                                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                                                        type="button" 
                                                        value="Delete Location" 
                                                        onClick={() =>
                                                            onRouteChange("delete",'locations', data)} /> 
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        
                    </div>
                </div>
            )
        } else if (route === 'edit') {
            return(
            <Edit target={singleloc} route={route} database={db}  onReload={this.onReload}/>
            )
        } else if (route === 'add') {
            return(
                <Add database={db} onReload={this.onReload}/>
            )
        }
    }
    
}

export default Locations;