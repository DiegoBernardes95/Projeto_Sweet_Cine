import Navbar from '../components/Navbar';
import '../styles/NewRegister.css';
import cinema from '/public/pipoca.png';
import filme from '/public/oculos-3d.png';
import FormCinema from '../components/FormCinema';
import FormFilme from '../components/FormFilme';
import ModalComponent from '../components/ModalComponent';
import { useEffect, useState, useRef } from 'react';
import Forms from '../components/Forms';
import Footer from '../components/Footer';
import ScrollReveal from 'scrollreveal';
import TitleLoading from '../components/TitleLoading';
import VanillaTilt from 'vanilla-tilt';

const NewRegister = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    // Esse estado atua na condicional da props do componente para os formulários para exibir o formulário de filmes ou cinema
    const [showCadCine, setShowCadCine] = useState(false);

    const cadCine = () => {
        setShowCadCine(true);
        setShowModal(true);
    }

    const cadFilme = () => {
        setShowModal(true);     
    }

    useEffect(() => {
        ScrollReveal({reset: true}).reveal('.forScrollCine', {
            origin: "left",
            distance: '50px',
            duration: 2400
        })

        ScrollReveal({reset: true}).reveal('.forScrollFilme', {
            origin: "right",
            distance: "50px",
            duration: 2400
        })

        ScrollReveal({reset: true}).reveal('.forScrollParagraph', {
            origin: "top",
            distance: "30px",
            duration: 2000
        })

       
        ScrollReveal({reset: true}).reveal('.forScrollTitleFilme', {
            origin: "right",
            distance: "60px",
            duration: 2000
        })
   
        ScrollReveal({reset: true}).reveal('.forScrollUnderlineFilme', {
            origin: "left",
            distance: "40px",
            duration: 2500
        })
    }, [])

    // Animação 3D com VanillaTilt
    const imgFilme = useRef();
    const imgCine = useRef();

    useEffect(() => {
        VanillaTilt.init(imgCine.current, {
            scale: 1.1,
            reverse: true,
            glare: true,
            "max-glare": 0.3,
            perspective: 500
        })
        VanillaTilt.init(imgFilme.current, {
            scale: 1.1,
            reverse: true,
            glare: true,
            "max-glare": 0.3,
            perspective: 500
        })

    }, [])


    return(
        
        <div className="globalRegister">
            <ModalComponent state={showModal} modalContent={!showLoading ? <Forms setCloseModal={setShowModal} showCadCine={setShowCadCine} formContent={!showCadCine ? <FormFilme setShowLoading={setShowLoading} setCadCine={setShowCadCine} toForm={true}/> : <FormCinema setShowLoading={setShowLoading} whatForm={false}/>}/> : <TitleLoading animationHere={true}/>}/>
            <Navbar />
            <main className="mainRegister">
                <p className='forScrollParagraph'>Escolha uma das opções abaixo:</p>
                <ul className="listRegister">
                    <li className='forScrollCine'>
                        <div className="titleForBtn">
                            <h2 className='forScrollTitle'>Cinema</h2>
                            <div className='forScrollUnderline'></div>
                        </div>
                        <button><img ref={imgCine} onClick={cadCine} src={cinema} alt="" /></button>
                    </li>
                    <li className='forScrollFilme'>
                        <div className="titleForBtn">
                            <h2 className='forScrollTitleFilme'>Filme</h2>
                            <div className='forScrollUnderlineFilme'></div>
                        </div>
                        <button><img ref={imgFilme} onClick={cadFilme} src={filme} alt="" /></button>
                    </li>
                </ul>   
            </main>   
            <Footer />
        </div>
    )
}
export default NewRegister;