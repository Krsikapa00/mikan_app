import React from 'react';
import Edit from './Edit';


class EditUsers extends React.Component {
    constructor(){
        super();
        this.state = {
            route: 'main',
            singleuser: {},
            userarr: [],
            db: ''
        }
      }
    

    
    onRouteChange = (route, database, user) =>{
        this.setState({route: route, singleuser:user, db:database})
    }
    
    onReload = (route) => {
        this.setState({route: 'main', singleuser:{}, userarr: []})
        this.editUsersArr();
        this.props.onRouteChange(route);
    }

    editUsersArr = () =>{
        fetch(`http://localhost:3000/edituserslist`, {
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
        ;
        const { onRouteChange } = this;
        const { route, singleuser, userarr, db } = this.state;
        if (route === 'main'){
            return(
                
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
                                                <input 
                                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                                                    type="button" 
                                                    value="Edit" 
                                                    onClick={() =>
                                                        onRouteChange("edit", 'users', data)} />
                                            </td>
                                            <td key={'deleteuser'}>
                                                <input 
                                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                                                    type="button" 
                                                    value="Delete user" 
                                                    onClick={() =>
                                                        onRouteChange("delete",'users', data)} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    
                </div>
            )
        }
        else {
            return(
                <Edit target={singleuser} route={route} database={db}  onReload={this.onReload}/>
            )
        }
    }
}

export default EditUsers;