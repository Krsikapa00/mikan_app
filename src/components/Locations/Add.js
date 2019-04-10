import React from 'react';
import QrReader from 'react-qr-reader';

const Add = ({database, onReload}) => {


    return (
        <div> 
            <QrReader
                className = 'center'
                delay={200}
                style={{ width: '500px' }}
            />
        </div>
    )
}

export default Add;