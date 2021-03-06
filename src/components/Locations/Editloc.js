import React from 'react';
import Submitbtn from '../Submitbtn';
import Inputbar from '../Inputbar';
import QrReader from 'react-qr-reader';

const Editloc = ({ target, onReload }) => {
    
    const handleError = (err) => {
        console.error(err)
    }

    const handleScan = (data) => {
        if (data !== null) {
            const code = document.getElementById('newpassword')
            code.value = data;
            console.log(data)
        }
    }

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
            change['code'] = newpass;
        }
        if (box.checked) {
            change['active'] = true;
        } else {
            change['active'] = false;
        }
        submitUpdate(change);
    }

    const submitUpdate = (data) => {
        fetch(`https://mikan-app-api.herokuapp.com/locationedit`, {
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
                onReload(`editlocations`);
            } else {
                console.log(updateduser)
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div>
            <article className="br3 ba b--black-10 mv4 w-80 mw7 shadow-5 center">
                <main className="pa4 black-80">
                    <QrReader
                        className = 'center'
                        delay={200}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '%' }}
                    />
                    <form className="measure center">
                        <div id="sign_up" className="fw5 lh-copy f3 bt ma3 pa4">
                            <label className="f4 fw6 ph0 mh0">{`Edit ${target.name}`}</label>
                    
                            
                            <Inputbar label='Name' type="text" id="newname" placeholder= "Updated name" />

                            <Inputbar label='Password/Code' type="text" id="newpassword" placeholder= "Updated password/code" />

                            <Inputbar label='Address' type="text" id="newaddress" placeholder= "Updated address" />
                            
                            <label className="pa0 ma0 lh-copy f6 pointer"><input id='newcheck' type="checkbox" />{`In Use?`}</label>
                        </div>
                            <Submitbtn value="Update" onClick={onUpdate} className='w-30'/>
                    </form>
                </main>  
            </article>   
        </div>
    )
    
}

export default Editloc;