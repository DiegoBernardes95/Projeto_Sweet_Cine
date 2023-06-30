import Navbar from "../components/Navbar";
import "../styles/Cinemas.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ConversorData from "../components/ConversorData";
import TitlesSection from "../components/TitlesSection";
import btnEdit from '/public/icons8-edit-64.png';
import btnDel from '/public/icons8-garbage-50.png';
import Footer from "../components/Footer";
import ModalComponent from "../components/ModalComponent";
import FormCinema from "../components/FormCinema";
import Forms from "../components/Forms";
import DelRegister from "../components/DelRegister";
import TitleLoading from "../components/TitleLoading";
import cinemaimg from '/public/cinema.png'
import btnFilme from '/public/btnFilme.png'
import starFull from '/public/starFull.png';
import ListNotas from "../components/ListNotas";
import ScrollReveal from "scrollreveal";

const Cinemas = () => {
    const [showLoading, setShowLoading] = useState(false);

    // INFORMAÇÕES PARA O HEADER DA PÁGINA
    const [lastMovie, setLastMovie] = useState([]);
    const [imgLastCinema, setImgLastCinema] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/ultimo_filme").then(res => setLastMovie(res.data));

        axios.get(`http://localhost:3000/cinema/${lastMovie.idCinema}`).then(res => setImgLastCinema(res.data));

    }, [lastMovie])

    // FIM DAS INFORMAÇÕES PARA O HEADER DA PÁGINA

    // CONFIGURANDO UM ELEMENTO A PARTIR DO useRef
    const listFilmesForCine = useRef();
    const lastCine = useRef();
    const scrollListFilmesForCines = () => {
        listFilmesForCine.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollLastCine = () => {
        lastCine.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        lastCine.current.style.background = `url("${imgLastCinema.foto_do_cinema}") #000000ac`;
        lastCine.current.style.backgroundSize = "cover";
        lastCine.current.style.backgroundRepeat = 'no-repeat';
        lastCine.current.style.backgroundBlendMode = "darken";
        lastCine.current.style.backgroundAttachment = "fixed";
    }, [imgLastCinema])
    // FIM DA CONFIGURAÇÃO

    // INFORMAÇÕES DA PARTE PRINCIPAL DA PÁGINA
    const [cinemas, setCinemas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [whatForm, setWhatForm] = useState(true);
    const [postOrEdit, setPostOrEdit] = useState(true);
    const [cinemaId, setCinemaId] = useState([]);
    const [idCine, setCineId] = useState();
    useEffect(() => {
        axios.get("http://localhost:3000/cinema").then(res => setCinemas(res.data));

        axios.get(`http://localhost:3000/cinema/${idCine}`).then(res => setCinemaId(res.data));

    }, [idCine])

    const editCine = (cinemaId) => {
        setShowModal(true);
        setWhatForm(true);
        setCineId(cinemaId);
        setPostOrEdit(true);
    }

    const delCine = (cinemaId) => {
        setShowModal(true);
        setWhatForm(false);
        setCineId(cinemaId);
    }

    // FIM DAS INFORMAÇÕES DA PARTE PRINCIPAL DA PÁGINA

    // LISTAGEM DE FILMES PELO CINEMA
    const listFull = useRef();
    const [idCinema, setIdCinema] = useState();
    const [nameCine, setNameCine] = useState();
    const [listMoviesCine, setListMoviesCine] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/filme_por_cinema/${idCinema}`).then(res => setListMoviesCine(res.data));

    }, [idCinema])
    const listMoviesCineSlice = listMoviesCine.slice(0, 8);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const scrollRef = () => {
        listFull.current.scrollIntoView({ behavior: "smooth" });
    }

    // FIM DA LISTAGEM DE FILMES PELO CINEMA

    useEffect(() => {
        ScrollReveal({reset: true}).reveal(".asideLateral" , {
            origin: "left",
            distance: "100px",
            duration: 1000
        })
    }, [])
    return (
        <div>
            <ModalComponent state={showModal} modalContent={!showLoading ? <Forms setCloseModal={setShowModal} formContent={whatForm ? (!postOrEdit ? (<FormCinema setShowLoading={setShowLoading} whatForm={postOrEdit} />) : (<FormCinema setShowLoading={setShowLoading} whatForm={postOrEdit} id={cinemaId.id} nome={cinemaId.nome} bairro={cinemaId.bairro} cidade={cinemaId.cidade} estado={cinemaId.estado} foto_do_cinema={cinemaId.foto_do_cinema} comentario={cinemaId.comentario} nota={cinemaId.nota} />)) : <DelRegister setShowLoading={setShowLoading} closeModal={setShowModal} id={idCine} />} /> : <TitleLoading animationHere={true} />} />
            <Navbar />
            <div className="Cinema">
                <aside className="asideLateral">
                    <nav className="contentLateral">
                        <h1>Cinemas</h1>
                        <ul className="listContentLateral">
                            <li><button onClick={scrollLastCine}>Último cinema frequentado</button></li>
                            <li><button onClick={scrollListFilmesForCines}>Lista de filme por cinema</button></li>
                            <li><button onClick={() => {
                                setShowModal(true);
                                setPostOrEdit(false);
                            }}>Registrar cinema</button></li>
                        </ul>
                    </nav>
                </aside>
                <main className="mainLateral">
                    <div ref={lastCine} className="lastCine">
                        <p>Último cinema frequentado:</p>
                        <h1>{lastMovie.length != 0 ? imgLastCinema.nome : "Nenhum filme assistido"}</h1>
                        <p>Filme assistido:</p>
                        <h1>{lastMovie.titulo ? lastMovie.titulo : "Nenhum filme encontrado"}</h1>
                        <p>Data:</p>
                        <h1>{lastMovie.data_view ? <ConversorData data={lastMovie.data_view} /> : "Data não encontrada"}</h1>
                    </div>
                    <section ref={listFilmesForCine} className="sectionFilmesPorCinema">
                        <div className="titleMain">
                            <h1>Olá, <br /><span>{sessionStorage.name}!</span></h1>
                            <p>Confira abaixo sua lista de cinemas frequentados:</p>
                            <p className="descriptionSectionMovies">Clique em "<img id="btnDescription" src={btnFilme} alt="" />" para exibir a lista de filmes assistidos naquele cinema.</p>
                        </div>

                        <ul className="sectionList ulCinemas">
                            {cinemas.length != 0 ? cinemas.map(cines => (
                                <li className="cineContent2">
                                    <Link to={`/Cinema/${cines.id}`}>
                                        {cines.foto_do_cinema ? <img src={cines.foto_do_cinema} alt="" /> : <img src="https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png" alt="" />}
                                    </Link>
                                    <div className="cineInfoContent cineInfoContent2">
                                        <div className="fullListNote align-items-center flex-column gap-3 mb-4">
                                            <figure className="d-flex gap-1 m-0">
                                                {Array.from({ length: cines.nota }, (_, index) => (
                                                    <img key={index} src={starFull} alt="" />
                                                ))}
                                            </figure>
                                            <sub>{<ListNotas index={cines.nota}/>}</sub> 
                                        </div>
                                        <p>{cines.nome}</p>
                                        <p>{cines.bairro} <br />{cines.cidade}</p>
                                        <div className="buttons">
                                            <button onClick={() => editCine(cines.id)}><img src={btnEdit} alt="" /></button>
                                            <button onClick={() => delCine(cines.id)}><img src={btnDel} alt="" /></button>
                                            <button onClick={() => {
                                                setIdCinema(cines.id);
                                                setNameCine(cines.nome);
                                                scrollRef();
                                            }} className="text-white"><img src={btnFilme} alt="" /></button>
                                        </div>
                                    </div>
                                </li>
                            )) :
                                <li>
                                    <h3>Nenhum cinema encontrado...</h3>
                                </li>
                            }
                        </ul>
                        <div className="titleUlListFull">{idCinema ? <TitlesSection title={nameCine} setFontSize={"16px"} setBackgroundColor={"#0000"} /> : ""}</div>
                        <ul ref={listFull} className="listFullMoviesCine">

                            {listMoviesCineSlice.length != 0 ? listMoviesCineSlice.map(res => (
                                <li onClick={scrollTop}>
                                    <Link to={`/Filmes/${res.id}`}>
                                        {res.poster ? <figure className="m-0">
                                            <img src={res.poster} alt="" />
                                        </figure>
                                            :
                                            <img src="https://img.freepik.com/vetores-gratis/glitch-error-404-page_23-2148105404.jpg?w=2000" alt="" title={res.titulo} />}
                                    </Link>
                                </li>
                            )) :

                                <li className="defaultCineError listFullEmpty">
                                    <img src={cinemaimg} alt="" />
                                    <p>Aguardando filmes...</p>
                                </li>
                            }
                        </ul>
                        {idCinema ? <Link to={`/Cinema/${idCinema}`}><button onClick={scrollTop} className="btnMoreMoviesCine">mais</button></Link> : ""}
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default Cinemas;