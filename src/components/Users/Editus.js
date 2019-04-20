import React from 'react';
import Submitbtn from '../Submitbtn';
import Inputbar from '../Inputbar';

const Editus = ({ target, onReload }) => {
    
    const onUpdate = () => {
        let change = {
            id: target.id,
        }
        const newname = document.getElementById('newname').value;
        const newpass = document.getElementById('newpassword').value;
        const box = document.getElementById('newcheck');
        if (newname.length > 0){
           change['name'] = newname;
        } 

        if (newpass.length > 0){
            change['pass'] = newpass;
        }

        if (box.checked) {
            change['admin'] = true;
        } else {
            change['admin'] = false;
        }
        submitUpdate(change);
        
    }

    const submitUpdate = ( data ) => {
        fetch(`https://mikan-app-api.herokuapp.com/useredit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
           data
        )
        })
        .then(response => response.json())
        .then(updateduser =>{
            if (updateduser[0].id) {
                console.log(updateduser)
                onReload(`editusers`);
            } else {
                console.log(updateduser)
            }
        })
        .catch(err => console.log(err));
    }
    
    return(
        <div>
        <article className="br3 ba b--black-10 mv4 w-100 mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure center">
                    <legend className="f1 fw6 ph0 mh0 center bb">{`Edit ${target.name}`}</legend>
                    <Inputbar label='Name' type="text" id="newname" placeholder= "Updated name" />

                    <Inputbar label='Password/Code' type="password" id="newpassword" placeholder= "Updated password/code" />

                    <label className="pa0 ma0 lh-copy f6 pointer"><input id='newcheck' type="checkbox" />Admin User?</label>
                </form>
                        <Submitbtn value="Update" onClick={onUpdate} className='w-30'/>
            </main> 
        </article>    
    </div>
    )
}
export default Editus;