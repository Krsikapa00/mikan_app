import React from 'react';

class Error extends React.Component{

    changeback = () => {
        const message = document.getElementById('error');
        console.log(message);
        // if (document.getElementById('error').innerText !== '') {
        //     setTimeout(reset(),5000);
        // }
    }

    

    reset = () => {
        document.getElementById('error').innerText = '';
    }
    render() {
        const message = document.getElementById('error');
        console.log(message)
       


        return (
            <div
                id='error'
                className='ma4'
            ></div>
        )
    }
}

export default Error;