import React from 'react';
import Editus from './Editus';
import Submitbtn from '../Submitbtn';
import Deleteus from './Deleteus';
import Addus from './Addus';

class EditUsers extends React.Component {
    constructor(){
        super();
        this.state = {
            route: 'main',
            singleuser: {},
            userarr: [],
        }
      }
    
    onRouteChange = (route, user) =>{
        this.setState({route: route, singleuser:user})
    }
    
    onReload = (route) => {
        this.setState({route: 'main', singleuser:{}, userarr: []})
        this.editUsersArr();
        this.props.onRouteChange(route);
    }

    editUsersArr = () =>{
        fetch(`http://localhost:3000/userseditlist`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id,
                admin: this.props.user.admin,
            })
        })
        .then(response => response.json())
        .then(usersArray =>{
            this.setState({userarr: usersArray})  
        })
        .catch(err => console.log(err));
      }

    componentDidMount() {
        this.editUsersArr();  
    }
    
    render(){
        const { onRouteChange } = this;
        const { route, singleuser, userarr } = this.state;
        if (route === 'main'){
            return(
                <div>
                    <div className='w-70 flex justify-end' style={{marginLeft:'auto', marginRight:'auto'}}>
                        <Submitbtn
                            value="Register User" 
                            onClick={() =>
                                onRouteChange("add", '')} />
                    </div>
                    <div className='table-cont' > 
                        
                        <table className="" cellSpacing="0" id='historyTable'>
                                <thead align='' className='' >
                                    <tr className=''>
                                        <th className=" ">ID</th>
                                        <th className=" ">Name</th>
                                        <th className=" ">Admin?</th>
                                        <th colSpan='2' className=" ">Edit User</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {userarr.map(function(data, i){
                                        return(
                                            <tr className='' >
                                                <td key={'id'} className="">{data.id}</td>
                                                <td key={'name'} className="">{data.name}</td>
                                                <td key={'adminuser'} className="">{`${data.admin}`}</td>
                                                <td key={'editname'}>
                                                    <Submitbtn 
                                                        value="Edit" 
                                                        onClick={() =>
                                                            onRouteChange("edit", data)} />
                                                </td>
                                                <td key={'deleteuser'}>
                                                    <Submitbtn  
                                                        value="Delete" 
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
        }
        else if (route === 'edit') {
            return(
                <Editus target={singleuser}  onReload={this.onReload}/>
            )
        } else if (route === 'add') {
            return(
                <Addus onReload={this.onReload}/>
            )
        }
        else if (route === 'delete') {
            return(
                <Deleteus target={singleuser}  onReload={this.onReload}/>
            )
        }
    }
}

export default EditUsers;