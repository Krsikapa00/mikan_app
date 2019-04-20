import React from 'react';
import Submitbtn from "../Submitbtn";

const Deleteus = ({onReload, target }) => {

    const onDelete = () => {
        let change = {
            id: target.id
        }
        const box = document.getElementById('deletebox');
        if (box.checked){
            submitDelete(change)
        } else {
            onReload(`editusers`);
        }
    }
    const submitDelete = (data) => {
        console.log(data);
        fetch(`https://mikan-app-api.herokuapp.com/userdelete`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
           data
        )
        })
        .then(response => response.json())
        .then(updateduser =>{
            console.log(updateduser)
            onReload(`editusers`);
        })
        .catch(err => console.log(err));
    }

    return (
        <div className=''>  
            <article className="br3 ba b--black-10 mv4 w-100 mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                    <form className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 center bb">{`Delete: ${target.name}`}</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" >{`(Check box and submit if you are sure you want to delete ${target.name})`} </label>
                            <label className="pa0 ma2 lh-copy f6 pointer"><input  id='deletebox' type="checkbox" /> Delete?</label>
                            <Submitbtn value="Delete" onClick={onDelete} className='w-30' />
                        </div>
                    </form>
                    </div>
                </main>    
            </article>     
        </div>
    )
}

export default Deleteus;