import "../styles/LandingPage.css";
import ModalComponent from "../components/ModalComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import Typewriter from "typewriter-effect";
import AnimatedLoading from "../components/AnimatedLoading";
import Forms from "../components/Forms";
import UserName from "../components/UserName";
import TitleFooter from "../components/TitleLoading";

const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);

    // Esse estado irá checar se há conexão com o banco de dados, se não houver, irá exibir a animação de loading.
    const [dbCurrent, setDbCurrent] = useState([]);
    const [checkDb, setCheckDb] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3000/filme")
            .then(res => {
                setDbCurrent(res.data);
                setCheckDb(true);
            })
            .catch(() => {
                setCheckDb(false);
            });
    }, [])

    const getModalComponent = () => {
        setShowModal(true);
    }

    const [showLoading, setShowLoading] = useState(false);

    return (
        <div>
            <ModalComponent state={showModal} modalContent={checkDb ? (!showLoading ? <Forms setCloseModal={setShowModal} formContent={<UserName setShowLoading={setShowLoading}/>}/> : <TitleFooter animationHere={true}/>) : <AnimatedLoading />}/>
            <nav className="landingPageNavbar">
                <p>Sweet Cine <span>- O lar do inesquecível</span></p>
            </nav>
            <div className="landingPageBody">
                
                <header className="landingPageHeader">
                    <h1>Sweet</h1>
                    <h1>Cine</h1>
                    <div></div>
                    <p>o lar do inesquecível</p>
                </header>
                <main className="landingPageTexts">
                    <p>O Sweet Cine é o lugar perfeito para você guardar os momentos especiais que a sétima arte te proporcionou.</p>
                    <p>Aqui você vai poder catalogar todos os filmes que já assistiu no cinema, salvar suas informações, deixar um comentário, uma nota e ainda ter acesso a um levantamento personalizado sobre sua jornada como cinéfilo.</p>
                    <p>Entre já e relembre cada experiência!</p>
                    <p>O Sweet Cine é seu lugar para guardar o inesquecível!</p>
                </main>
                <button onClick={getModalComponent} className="landingPageBtn"
                >Entrar</button>                
            </div>
            <footer className="landingPageFooter">
                <div className="landingPageFooterLists lPFooter">
                    <ul>
                        <h4>Dúvidas?</h4>
                        <li>O que é o Sweet Cine?</li>
                        <li>Quanto custa?</li>
                        <li>Há limites de uso?</li>
                    </ul>
                    <ul>
                        <h4>Contato</h4>
                        <li>Instagram</li>
                        <li>Facebook</li>
                        <li>Twitter</li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage