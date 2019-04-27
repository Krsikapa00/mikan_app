import React from 'react';
import Submitbtn from "../Submitbtn";
import Deleteform from '../Deleteform';

const Deleteloc = ({onReload, target, }) => {
    return (
    <Deleteform route={'locationdelete'} target={target} onReload={onReload} />
    )
}
export default Deleteloc;