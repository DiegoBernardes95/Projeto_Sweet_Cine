import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../styles/PerfilFilme.css';
import edit from '/public/icons8-edit-64.png';
import del from '/public/icons8-garbage-50.png';
import star from '/public/starfull.png'
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ConversorData from '../components/ConversorData';
import ModalComponent from '../components/ModalComponent';
import Forms from '../components/Forms';
import FormFilme from '../components/FormFilme';
import FormCinema from '../components/FormCinema';
import DelRegister from '../components/DelRegister';
import TitleLoading from '../components/TitleLoading';
import ListNotas from '../components/ListNotas';
import VanillaTilt from 'vanilla-tilt';
import ScrollReveal from 'scrollreveal';
import React from 'react';

const PerfilFilme = () => {
    const { id } = useParams();
    const [movieForId, setMovieForId] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCadCine, setShowCadCine] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/filme/${id}`).then(res => setMovieForId(res.data));
    }, [id])

    const listStars = []
    const stars = () => {
        for (let i = 0; i < movieForId.nota; i++) {
            listStars.push((<img src={star} alt="" />));
        }
    }
    stars();

    // EDITAR INFORMAÇÕES DO FILME
    const editMovie = () => {
        setShowModal(true);
        setShowModalDelete(false);
    }

    // DELETAR  FILME
    const deleteMovie = () => {
        setShowModal(true);
        setShowModalDelete(true);
    }

    // CONFIGURAÇÃO PARA O BACKGROUND E SCROLL DA PÁGINA
    const headerPerfilFilme = useRef();
    const sinopseContent = useRef();
    const comentarioContent = useRef();
    const infoContent = useRef();
    useEffect(() => {
        if(movieForId.capa){
            headerPerfilFilme.current.style.background = `url("${movieForId.capa}") #00000080`;
        } else{
            headerPerfilFilme.current.style.background = "url(https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png) #000000ac";
        }
        headerPerfilFilme.current.style.backgroundRepeat = "no-repeat";
        headerPerfilFilme.current.style.backgroundSize = "cover";
        headerPerfilFilme.current.style.backgroundBlendMode = "darken";
        headerPerfilFilme.current.style.backgroundPosition = "50% 50%";
    }, [movieForId])

    const scrollToCapa = () => {
        headerPerfilFilme.current.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToSinopse = () => {
        sinopseContent.current.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToComment = () => {
        comentarioContent.current.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToInfo = () => {
        infoContent.current.scrollIntoView({ behavior: "smooth" });
    }

    // Animação 3D com VanillaTilt
    const genero = useRef();
    const cinema = useRef();
    const data = useRef();
    const valor = useRef();

    const imgPoster = useRef();
    VanillaTilt.init(genero.current, {
        scale: 1.1,
        reverse: true,
        glare: true,
        "max-glare": 0.5
    })
    VanillaTilt.init(cinema.current, {
        scale: 1.1,
        reverse: true,
        glare: true,
        "max-glare": 0.5
    })
    VanillaTilt.init(valor.current, {
        scale: 1.1,
        reverse: true,
        glare: true,
        "max-glare": 0.5
    })
    VanillaTilt.init(data.current, {
        scale: 1.1,
        reverse: true,
        glare: true,
        "max-glare": 0.5
    })
    VanillaTilt.init(imgPoster.current, {
        scale: 1.1,
        glare: true,
        reverse: true,
        "max-glare": 0.3,
        perspective: 500
    })

    // Efeito de Scroll

    useEffect(() => {
        ScrollReveal({ reset: true }).reveal(".asideLateral", {
            origin: "left",
            distance: "100px",
            duration: 1000
        })
    }, [])

    // FORMATAÇÃO DO TEXTO
    const formatComment = () => {
        if (movieForId.comentario) {
            return movieForId.comentario.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    <span className='paragraphs'>{line}</span>
                    <br />
                </React.Fragment>
            ));
        }
        return "Sem comentários...";
    };

    return (
        <>
            <ModalComponent state={showModal} modalContent={!showLoading ? <Forms setCloseModal={setShowModal} showCadCine={setShowCadCine} formContent={!showModalDelete ? (!showCadCine ? <FormFilme setShowLoading={setShowLoading} id={movieForId.id} idCinema={movieForId.idCinema} cinema_assistido={movieForId.cinema_assistido} titulo={movieForId.titulo} poster={movieForId.poster} capa={movieForId.capa} genero={movieForId.genero} data_view={movieForId.data_view} ingresso={movieForId.ingresso} comentario={movieForId.comentario} sinopse={movieForId.sinopse} nota={movieForId.nota} toForm={false} setCadCine={setShowCadCine} /> : <FormCinema setShowLoading={setShowLoading} />) : <DelRegister setShowLoading={setShowLoading} whatDel={true} id={movieForId.id} poster={movieForId.poster} titulo={movieForId.titulo} closeModal={setShowModal} />} /> : <TitleLoading animationHere={true} />} />
            <Navbar />
            <div className='PerfilFilme'>
                <aside className='asideLateral'>
                    <nav className='contentLateral contentLateralFilme'>
                        <figure>
                            {movieForId.poster ? <img ref={imgPoster} src={movieForId.poster} alt="" /> : <img src="https://img.freepik.com/vetores-gratis/glitch-error-404-page_23-2148105404.jpg?w=2000" alt="" />}
                        </figure>
                        <ul className='listContentLateral'>
                            <li><button onClick={scrollToCapa}>Capa</button></li>
                            <li><button onClick={scrollToSinopse}>Sinopse</button></li>
                            <li><button onClick={scrollToComment}>Comentário</button></li>
                            <li><button onClick={scrollToInfo}>Informações</button></li>
                            <li><button onClick={editMovie}>Editar informações</button></li>
                            <li><button onClick={deleteMovie}>Excluir registro</button></li>
                        </ul>
                    </nav>
                </aside>
                <main className='mainLateral'>
                    <div ref={headerPerfilFilme} className='headerPerfilFilme'>
                        <div className='headerContent'>
                            <div className='iconsEdit'>
                                <button onClick={editMovie}><img src={edit} alt="" /></button>
                                <button onClick={deleteMovie}><img src={del} alt="" /></button>
                            </div>
                            <div className='textContent'>
                                <h1>{movieForId.titulo ? movieForId.titulo : "Titulo não encontrado"}</h1>
                                <div>
                                    {movieForId.nota ?
                                        <div>
                                            <span className='d-flex gap-2 mb-2 justify-content-center'>
                                                {listStars.map(stars => stars)}
                                            </span>
                                            <span className='formatNota'>{<ListNotas index={movieForId.nota} />}</span>
                                        </div>
                                        :
                                        <p>Sem avaliação disponível</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mainPerfilFilme'>
                        {movieForId.sinopse ? <div ref={sinopseContent} className='sinopseContent'>
                            <h3>Sinopse:</h3>
                            <p>{movieForId.sinopse}</p>
                        </div> : <div className='sinopseContent'>
                            <h3>Sinopse indisponível</h3>
                            <p>Nenhum registro encontrado...</p>
                        </div>}
                        <svg ref={comentarioContent} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0f1a20cf" fill-opacity="1" d="M0,160L48,165.3C96,171,192,181,288,170.7C384,160,480,128,576,101.3C672,75,768,53,864,64C960,75,1056,117,1152,117.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                        <div className='paragraphComment'>
                            {movieForId.comentario ? <h3>Na minha opinião...</h3> : ""}
                            <p>{formatComment()}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0f1a20cf" fill-opacity="1" d="M0,224L48,197.3C96,171,192,117,288,96C384,75,480,85,576,112C672,139,768,181,864,218.7C960,256,1056,288,1152,282.7C1248,277,1344,235,1392,213.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
                        <ul ref={infoContent} className='infosPerfilFilme'>
                            <li ref={genero}>
                                <h3>Gênero</h3>
                                <p>{movieForId.genero ? <Link to={`/Lista_Completa/${movieForId.genero}`}>{movieForId.genero}</Link> : "Desconhecido"}</p>
                            </li>
                            <li ref={cinema}>
                                <h3>Cinema</h3>
                                {movieForId.cinema_assistido ? (
                                    <p><Link to={`/Cinema/${movieForId.idCinema}`}>{movieForId.cinema_assistido}</Link></p>
                                ) : (
                                    <p>Desconhecido</p>
                                )}
                            </li>
                            <li ref={data}>
                                <h3>Data</h3>
                                <p>{movieForId.data_view ? <ConversorData data={movieForId.data_view} /> : "Desconhecida"}</p>
                            </li>
                            <li ref={valor}>
                                <h3>Valor</h3>
                                <p>{movieForId.ingresso ? "R$" + movieForId.ingresso.toFixed(2).replace(".", ",") : "Desconhecido"}</p>
                            </li>
                        </ul>
                        <TitleLoading />
                    </div>
                    <Footer />
                </main>
            </div>

        </>
    )
}

export default PerfilFilme;