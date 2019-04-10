import React from 'react';

const Edit = ({ target, onReload, route, database }) => {
    
    const onUpdate = () => {
        let change = {
            id: target.id,
            database: database
        }
        const newname = document.getElementById('newname').value;
        const newpass = document.getElementById('newpassword').value;
        const box = document.getElementById('newcheck');
        if (newname.length > 0){
           change['name'] = newname;
        } 

        if (newpass.length > 0){
            if (database === 'users'){
                change['pass'] = newpass;
            } else if (database === 'locations') {
                change['code'] = newpass;
            }
        }

        if (box.checked) {
            if (database === 'users'){
                change['admin'] = 'yes';
            } else if (database === 'locations') {
                change['active'] = 'yes';
            }
        } else {
            if (database === 'users'){
                change['admin'] = 'no';
            } else if (database === 'locations') {
                change['active'] = 'yes';
            }
        }
        submitUpdate('', change);
        
    }

    const onDelete = () => {
        let change = {
            id: target.id,
            database: database
        }
        const box = document.getElementById('deletebox');
        if (box.checked){
            submitUpdate(route, change)
        } else {
            onReload(`edit${database}`);
        }
    }


    const submitUpdate = (type, data ) => {
        console.log(data);
        fetch(`http://localhost:3000/edit${type}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
           data
        )
        })
        .then(response => response.json())
        .then(updateduser =>{
            console.log(updateduser)
            onReload(`edit${database}`);
        })
        .catch(err => console.log(err));
    }

  
    if (route === 'edit'){
        let title = 'Admin User?'
        if (database === 'locations') {
            title = 'In Use?';
        }
        return(
            <div>
            <main className="pa4 black-80">
                <form className="measure center">
                    <div id="sign_up" className="ba b--transparent ph0 mh0">
                        <label className="f4 fw6 ph0 mh0">{`Edit ${target.name}`}</label>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" >Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Name"  id="newname" placeholder= {`Updated name`}  />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" >Password/Code</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="newpassword" placeholder='Updated password/code' />
                        </div>

                        { database === 'locations'
                        ?(
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" > Address </label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="Address"  id="newaddress" placeholder='Updated address' />
                            </div>
                        )
                        :<div>
                        </div>
                        }
                        <label className="pa0 ma0 lh-copy f6 pointer"><input id='newcheck' type="checkbox" />{`${title}`}</label>
                    </div>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="reset" value="Update" onClick={onUpdate} />
                    </div>
                </form>
            </main>     
        </div>
        )
    }
    
    else if (route === 'delete') {
        return(
            <div className='shadow-5 w-50 center'>
                <main className="pa4 black-80">
                    <form className="measure center">
                        <div id="sign_up" className="ba b--transparent ph0 mh0">
                            <label className="f4 fw6 ph0 mh0">{`User: ${target.name}`}</label>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" >Update form </label>
                                <label className="db fw6 lh-copy f6" >{`(Check box and submit if you are sure you want to delete ${target.name})`} </label>
                                <label className="pa0 ma2 lh-copy f6 pointer"><input  id='deletebox' type="checkbox" /> Delete?</label>
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="reset" value="Update " onClick={onDelete} />
                            </div>
                        </div>
                    </form>
                </main>         


            </div>
        )

    }
}

export default Edit;