import React from 'react';
import Submitbtn from "../Submitbtn";

const Deleteloc = ({onReload, target, }) => {

    const onDelete = () => {
        let change = {
            id: target.id
        }
        const box = document.getElementById('deletebox');
        if (box.checked){
            submitDelete(change)
        } else {
            onReload(`editlocations`);
        }
    }
    const submitDelete = (data) => {
        console.log(data);
        fetch(`https://mikan-app-api.herokuapp.com/locationdelete`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
           data
        )
        })
        .then(response => response.json())
        .then(updateduser =>{
            console.log(updateduser)
            onReload(`editlocations`);
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='shadow-5 w-50 center'>  
            <main className="pa4 black-80">
                <form className="measure center">
                    <div id="sign_up" className="ba b--transparent ph0 mh0">
                        <label className="f4 fw6 ph0 mh0">{`User: ${target.name}`}</label>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" >Update form </label>
                            <label className="db fw6 lh-copy f6" >{`(Check box and submit if you are sure you want to delete ${target.name})`} </label>
                            <label className="pa0 ma2 lh-copy f6 pointer"><input  id='deletebox' type="checkbox" /> Delete?</label>
                            <Submitbtn value="Delete" onClick={onDelete} />
                        </div>
                    </div>
                </form>
            </main>         
        </div>
    )
}

export default Deleteloc;