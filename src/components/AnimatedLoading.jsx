import '../styles/stylesComponents/ModalComponent.css';
import load from '../../public/load.gif';


const AnimatedLoading = () => {
    return(
        <div>
            <img className="gifLoading" src={load} alt="gif de loading" />
            <p className="animatedLoading">Aguarde</p>
        </div>
    )
}

export default AnimatedLoading;