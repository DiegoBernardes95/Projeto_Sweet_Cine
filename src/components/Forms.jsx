import { useEffect, useState } from 'react';
import '../styles/stylesComponents/Forms.css';
import closeBtn from '/public/icon_close.png';
import ScrollReveal from 'scrollreveal';

const Forms = ({setCloseModal, showCadCine, formContent}) => {

    // Essa função fecha todo o modal
    const btnCloseForm = () => {
        setCloseModal(false);
        showCadCine(false);  
    }
    
    return(
        <div className="formMain">
            <button onClick={btnCloseForm} className="closeBtn"><img src={closeBtn} alt="" /></button>
            <main>{formContent}</main>
        </div>
    )
}

export default Forms;