import Navbar from "../components/Navbar";
import "../styles/Filmes.css";
import star from '/public/starfull.png';
import cinema from '/public/cinema.png'
import defaultMoviesSlice from '/public/movieSlice.png';
import { useEffect, useState, useRef } from "react";
import Footer from "../components/Footer";
import TitlesSection from "../components/TitlesSection";
import axios from "axios";
import ConversorData from "../components/ConversorData";
import { Link } from "react-router-dom";
import TitleLoading from "../components/TitleLoading";
import ModalComponent from "../components/ModalComponent";
import FormFilme from "../components/FormFilme";
import FormCinema from "../components/FormCinema";
import Forms from "../components/Forms";
import ScrollReveal from "scrollreveal";

const Filmes = () => {

    const [movies, setMovies] = useState([]);
    // State onde será armazenado apenas o último filme assistido
    const [lastMovie, setLastMovie] = useState([]);

    // States para exibir os gêneros cadastrados no banco de dados
    const [generos, setGeneros] = useState([]);
    const [filmesPorGenero, setFilmesPorGenero] = useState([]);
    const [btnChangeGenre, setBtnChangeGenre] = useState("");

    // A variável retorna um novo array com excluindo o primeiro registro, que é o último filme assistido
    const moviesSlice = movies.slice(0, 15);
    const genreSlice = filmesPorGenero.slice(0, 8);

    useEffect(() => {
        // GET de todos os filmes no banco de dados
        axios.get("http://localhost:3000/filme").then(res => setMovies(res.data));

        // GET do último filme assistido gravado no banco de dados
        axios.get("http://localhost:3000/ultimo_filme").then(res => {
            setLastMovie(res.data);
        })

        axios.get("http://localhost:3000/contador_genero").then(res => setGeneros(res.data));

        ScrollReveal({reset: true}).reveal(".asideLateral" , {
            origin: "left",
            distance: "100px",
            duration: 1000
        })

    }, [])

    // Array usada para repetir a img de estrela para dar nota ao filme, é usado a nota do banco de dados na condicional do laço de repetição 
    const listStars = [];
    const stars = () => {
        for (let i = 0; i < lastMovie.nota; i++) {
            listStars.push((<img src={star} alt="" />));
        }
    }
    stars();


    // CÓDIGO PARA CRIAÇÃO DE GÊNEROS
    useEffect(() => {
        axios.get(`http://localhost:3000/filmes_por_genero/${btnChangeGenre}`,).then(res => setFilmesPorGenero(res.data));
    }, [btnChangeGenre])


    // Scrollar a página para o topo
    const moviesRef = useRef(null);
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const moviesGenre = useRef(null);
    const scrollBottom = () => {
        moviesGenre.current.scrollIntoView({ behavior: "smooth" });
    }

    // CÓDIGO PARA SETAR O BACKGROUND DO COMPONENTE QUE EXIBI O ÚLTIMO FILME ASSISTIDO E SCROLLAR ATÉ UM ELEMENTO
    const setBackground = useRef();
    useEffect(() => {
        if(lastMovie.capa){
            setBackground.current.style.background = `url("${lastMovie.capa}") #00000080`;
        } else{
            setBackground.current.style.background = "url(https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png) #000000ac";
        }
        setBackground.current.style.backgroundRepeat = "no-repeat";
        setBackground.current.style.backgroundSize = "cover";
        setBackground.current.style.backgroundBlendMode = "darken";
    }, [lastMovie])

    const myMovies = useRef();
    const sectionGenre = useRef();
    const scrollToLastFilme = () => {
        setBackground.current.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToMyMovies = () => {
        myMovies.current.scrollIntoView({ behavior: "smooth" });
    }

    const scrollToSectionGenre = () => {
        sectionGenre.current.scrollIntoView({ behavior: "smooth" });
    }

    // CADASTRAR FILMES
    const [showModal, setShowModal] = useState(false);
    const [showCadCine, setShowCadCine] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    return (
        <div>
            <ModalComponent state={showModal} modalContent={!showLoading ? <Forms setCloseModal={setShowModal} showCadCine={setShowCadCine} formContent={!showCadCine ? <FormFilme setShowLoading={setShowLoading} setCadCine={setShowCadCine} toForm={true} /> : <FormCinema setShowLoading={setShowLoading} whatForm={false} />} /> : <TitleLoading animationHere={true} />} />
            <Navbar />
            <div className="Filmes">
                <aside className="asideLateral">
                    <nav className="contentLateral">
                        <h1>Filmes</h1>
                        <ul className="listContentLateral">
                            <li><button onClick={scrollToLastFilme}>Último filme assistido</button></li>
                            <li><button onClick={scrollToMyMovies}>Lista de filmes</button></li>
                            <li><button onClick={scrollToSectionGenre}>Lista de filmes por gênero</button></li>
                            <li><Link to="/Lista_Completa">Lista completa</Link></li>
                            <li><button onClick={() => setShowModal(true)}>Registrar filme</button></li>
                        </ul>
                    </nav>
                </aside>
                <main className="mainLateral">
                    <div ref={setBackground} className="lastMovies">
                        <div className="infoLastMovie">
                            <p>{lastMovie.length != 0 ? "Último filme assistido:" : "Nenhum registro encontrado"}</p>
                            <div className="titleMovie">
                                <p>{lastMovie.titulo ? lastMovie.titulo : <p>Nenhum filme encontrado</p>}</p>
                                {lastMovie.nota ? listStars.map(show => show) : <p>Sem avaliação disponível</p>}
                            </div>
                            <p>{lastMovie.cinema_assistido ? lastMovie.cinema_assistido : "Nenhum cinema encontrado"}<br />{lastMovie.data_view ? <ConversorData data={lastMovie.data_view} /> : "Data não encontrada"}</p>
                        </div>
                    </div>
                    <div ref={myMovies} className="myMovies">
                        <div className="mainContentMovies">
                            <div className="titleMainMovie">
                                <h1>Olá, <br /><span>{sessionStorage.getItem("name")}!</span></h1>
                                <p>Confira abaixo a sua lista de filmes assistidos:</p>
                            </div>
                            <ul className="listMovies">
                                {moviesSlice.length != 0 ? moviesSlice.map(movie => (
                                    <li key={movie.id}>
                                        <Link to={`/Filmes/${movie.id}`} ref={moviesRef} onClick={scrollTop}>{movie.poster ?
                                            <img src={movie.poster} alt="" />
                                            :
                                            <img src="https://img.freepik.com/vetores-gratis/glitch-error-404-page_23-2148105404.jpg?w=2000" alt="" title={movie.titulo} />} </Link>
                                    </li>
                                )) : <div className="d-flex flex-column align-items-center gap-3">
                                    <img src={defaultMoviesSlice} alt="" className="w-25" />
                                    <h3 className="fs-6">Nenhum filme encontrado...</h3>
                                </div>}
                            </ul>
                        </div>
                        <div className="btnFullList">
                            <Link onClick={scrollTop} to="/Lista_Completa" className="btnFullList">mais</Link>
                        </div>
                    </div>
                    <section ref={sectionGenre} className="sectionGenre">
                        <TitlesSection title={"Gêneros"} setBackgroundColor={"#0000"} setFontSize={"21px"} />
                        <div className="titleGenre">
                            <p>Aqui está sua lista de filmes organizados pelo gênero.<br />Clique em umas das opções para exibir a lista de filmes daquele gênero.</p>
                        </div>
                        <div id="carouselExampleIndicators" class="carousel slide m-auto listGenre ">
                            <div class="carousel-inner carouselContent">
                                <div onClick={() => setBtnChangeGenre(false)} class="carousel-item active carouselImg">
                                    <h3>Gêneros</h3>
                                    <img src="https://culturaeviagem.files.wordpress.com/2013/05/a-genero-de-filme.jpg" class="d-block " alt="..." />
                                </div>
                                {generos.map(generos => (
                                    <div onClick={() => {
                                        scrollBottom();
                                        setBtnChangeGenre(generos.genero);
                                    }} class="carousel-item carouselImg">
                                        <h3>{generos.genero ? generos.genero : "Desconhecido"}</h3>
                                        <img class="d-block " alt="..." src={generos.poster ? generos.poster : "https://img.freepik.com/vetores-gratis/glitch-error-404-page_23-2148105404.jpg?w=2000"} />
                                    </div>
                                ))}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="titleMoviesGenre">
                            {btnChangeGenre ? <TitlesSection title={btnChangeGenre} setBackgroundColor={"transparent"} setFontSize={"21px"} /> : console.log("Selecione um registro.")}
                        </div>
                        <ul class="listMoviesGenre" ref={moviesRef}>
                            <span ref={moviesGenre}></span>
                            {btnChangeGenre ? <>
                                <li className="contentListGenre">
                                    {genreSlice.map(res => (
                                        <div key={res.id} id="theContentListGenre">
                                            <Link to={`/Filmes/${res.id}`} onClick={scrollTop}>{res.poster ? <div>
                                                <img src={res.poster} alt="" />
                                            </div>
                                                :
                                                <img src="https://img.freepik.com/vetores-gratis/glitch-error-404-page_23-2148105404.jpg?w=2000" alt="" title={res.titulo} />}</Link>
                                        </div>
                                    ))}
                                </li>

                                <div className="btnFullList btnFullList2">
                                    <Link onClick={scrollTop} to={`/Lista_Completa/${btnChangeGenre}`} className="btnFullList btnFullList2">mais</Link>
                                </div>
                            </>
                                : <div className="defaultGenre">
                                    <img src={cinema} alt="" />
                                    <h3>Escolha um gênero...</h3>
                                </div>}
                        </ul>
                    </section>
                    <Footer />
                </main>
            </div>

        </div>
    )
}

export default Filmes;