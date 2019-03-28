import React from 'react';


const EditUsers = ({ user }) => {
    let usersArr;
    fetch(`http://localhost:3000/editusers`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: user.id,
            admin: user.admin,
        })
    })
    .then(response => response.json())
    .then(usersArray =>{
        usersArr = usersArray;
    })
    .catch(err => console.log(err));

    

    return(
        <div className='overflow-y-auto'> 
            {usersArr.map(function(data, i){
                return(
                    <div className='' >
                        <p key={i} className="">{data.id}</p>
                        <p key={i} className="">{data.name}</p>
                        <p key={i} className="">{data.admin}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default EditUsers;