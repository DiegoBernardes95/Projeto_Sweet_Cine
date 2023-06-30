import { useEffect, useRef } from "react";
import "../styles/stylesComponents/ModalComponent.css";


function ModalComponent({state, modalContent}){
    const modalComponent = useRef();

    useEffect(() => {
        switch(state){
            case true:
                modalComponent.current.style.display = "flex";
                break;
            case false:
                modalComponent.current.style.display = "none";
                break;
        }
    }, [state])
    

    return (
        <div ref={modalComponent} className="modalComponent">
            <div className="modalContent">
                <div>{modalContent}</div>
            </div>
        </div>
    )
}

export default ModalComponent;