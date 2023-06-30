import { useEffect, useState } from 'react';
import '../styles/stylesComponents/Navbar.css';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import ModalComponent from './ModalComponent';
import Forms from './Forms';
import UserName from './UserName';
import userImg from '/public/icons8-user-48.png';
import TitleLoading from './TitleLoading';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        ScrollReveal({ reset: true }).reveal('.navLogo', {
            duration: 1500,
            origin: "left",
            distance: "30px"
        })
    }, [])

    return (
        <>
            <ModalComponent state={showModal} modalContent={!showLoading ? <Forms setCloseModal={setShowModal} formContent={<UserName setShowLoading={setShowLoading}/>}/> : <TitleLoading animationHere={true}/> }/>
            <nav class="navbar navbar-expand-lg navbar-dark navBar">
                <div class="container-fluid">
                    <div class="navLogoDiv">
                        <div class="navLogo">
                            <Link to={`/Home/${sessionStorage.getItem("name")}`}><h2>Sweet</h2></Link>
                        </div>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span
                            class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse listNavbar" id="navbarNav">
                        <ul class="navbar-nav gap-3">
                            <li class="nav-item">
                                <Link to={`/Home/${sessionStorage.getItem("name")}`} class="nav-link">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/Novo_Registro" class="nav-link">+ Registro</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/Filmes" class="nav-link">Filmes</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/Cinemas" class="nav-link">Cinemas</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/Dashboard" class="nav-link">Informações</Link>
                            </li>
                            <li class="nav-item">
                                <button onClick={() => setShowModal(true)} className='nav-link'><img className='userImg' src={userImg} alt="" /></button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}
export default Navbar;