import React from 'react';
import Submitbtn from "../Submitbtn";
import Deleteform from '../Deleteform';

const Deleteus = ({onReload, target }) => {
    return (
        <Deleteform route={'userdelete'} target={target} onReload={onReload} />
    )
}

export default Deleteus;