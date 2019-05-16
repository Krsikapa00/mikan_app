import React from 'react';
import Editloc from './Editloc';
import Addloc from './Addloc';
import Deleteloc from './Deleteloc';
import Submitbtn from '../Submitbtn';


class Locations extends React.Component {
    constructor(){
        super();
        this.state = {
            route: 'main',
            locationarr: [],
            singleloc: {},
        }
    }
    onRouteChange = (route, user) =>{
        this.setState({route: route, singleloc:user})
    }
    
    onReload = () => {
        this.setState({route: 'main', singleuser:{}, userarr: []})
        this.loadlocarr();
        this.props.onRouteChange('editlocations'); 
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

    


    componentDidMount() {
        this.loadlocarr();
        
    }

    
    render(){
        const { onRouteChange } = this;
        const { route, singleloc, locationarr } = this.state;

        if (route === 'main'){
            return(
                <div>
                    <div className='w-70 flex justify-end' style={{marginLeft:'auto', marginRight:'auto'}}>
                        <Submitbtn
                            value="Add Location" 
                            onClick={() =>
                                onRouteChange("add", '')} />
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
                                                    <Submitbtn 
                                                        value="Edit Location" 
                                                        onClick={() =>
                                                            onRouteChange("edit", data)}
                                                        className='pa3' />
                                                </td>
                                            
                                                <td key={'deletelocation'}>
                                                    <Submitbtn 
                                                        value="Delete Location" 
                                                        onClick={() =>
                                                            onRouteChange("delete", data)} /> 
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
            <Editloc target={singleloc}  onReload={this.onReload}/>
            )
        } else if (route === 'add') {
            return(
                <Addloc onReload={this.onReload}/>
            )
        }
        else if (route === 'delete') {
            return(
                <Deleteloc onReload={this.onReload} target={singleloc} />
            )
        }
    }
    
}

export default Locations; 