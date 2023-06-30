import '../styles/FullListFilmes.css';
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Footer from '../components/Footer';
import load from '/public/cinema.png';
import TitleLoading from '../components/TitleLoading';
import ConversorData from '../components/ConversorData';
import star from '/public/starfull.png'
import ScrollReveal from 'scrollreveal';


const FullListFilmes = () => {
    const { genero } = useParams();
    const [movieListFull, setMovieListFull] = useState([]);
    const [moviesListFullGenre, setMoviesListFullGenre] = useState([]);
    const [generos, setGeneros] = useState([]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        axios.get("http://localhost:3000/filme").then(res => setMovieListFull(res.data));

        axios.get(`http://localhost:3000/filmes_por_genero/${genero}`).then(res => setMoviesListFullGenre(res.data));

        axios.get("http://localhost:3000/contador_genero").then(res => setGeneros(res.data));
    }, [genero])

    const msgShowFilmes = ["Lista de Filmes", "Essa é a lista completa de filmes que você assistiu nas telonas.", "Reviva cada momento!"];

    // ORGANIZAR LISTA COM SELECT
    const selectList = useRef();
    useEffect(() => {
        if (movieListFull.length == 0 && moviesListFullGenre == 0) {
            selectList.current.style.display = "none";
        } else {
            selectList.current.style.display = "flex";
        }
    }, [movieListFull, moviesListFullGenre])
    const [listSelect, setListSelect] = useState();
    let moviesFullList = [...movieListFull];
    let moviesFullListGenre = [...moviesListFullGenre];

    if (listSelect === "1") {
        moviesFullList.sort((filmeA, filmeB) => filmeA.data_view - filmeB.data_view);
        moviesFullListGenre.sort((filmeA, filmeB) => filmeA.data_view - filmeB.data_view);
    } else if (listSelect === "2") {
        moviesFullList.reverse();
        moviesFullListGenre.reverse();

    } else if (listSelect === "3") {
        moviesFullList.sort((filmeA, filmeB) => filmeA.nota - filmeB.nota).reverse();
        moviesFullListGenre.sort((filmeA, filmeB) => filmeA.nota - filmeB.nota).reverse();
    }


    // Exibição do gif de loading para falta de conexão com o banco de dados
    const defaultImgError = (<div className="defaultImgErrorFullList">
        <img src={load} alt="" />
        <p>Lista indisponível...</p>
    </div>)

    // Retorna a lista com todos os filmes pelo gênero
    const listGenreTrue = (moviesFullListGenre.map(res => (
        <li className='ulListFullContent'>
            <Link onClick={scrollTop} to={`/Filmes/${res.id}`}>
                {res.capa ? <img src={res.capa} alt="" /> : <img src='https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png' alt='' />}
                <div className='ulListFullContentDescription'>
                    <div className='fullListNote'>{Array.from({ length: res.nota }, (_, index) => (
                        <img key={index} src={star} alt='' />
                    ))}</div>
                    <p>{res.titulo}</p>
                    <sub>{res.data_view ? <ConversorData data={res.data_view} /> : "data indisponível"} - {res.genero}</sub>
                    <p className='fullListSinopse'>{res.sinopse ? res.sinopse : "Sinopse indisponível..."}</p>
                </div>
            </Link>
        </li>
    )));

    // Retorna a lista com todos os filmes
    const listAllMovieTrue = (moviesFullList.map(res => (
        <li className='ulListFullContent'>
            <Link onClick={scrollTop} to={`/Filmes/${res.id}`}>
                {res.capa ? <img src={res.capa} alt="" /> : <img src='https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png' alt='' />}
                <div className='ulListFullContentDescription'>
                    <div className='fullListNote'>{Array.from({ length: res.nota }, (_, index) => (
                        <img key={index} src={star} alt='' />
                    ))}</div>

                    <p>{res.titulo}</p>
                    <sub>{res.data_view ? <ConversorData data={res.data_view} /> : "data indisponível"} - {res.genero}</sub>
                    <p className='fullListSinopse'>{res.sinopse ? res.sinopse : "Sinopse indisponível..."}</p>
                </div>
            </Link>
        </li>
    )));

    const headerListFull = useRef();
    const scrollTopHeader = () => {
        headerListFull.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        ScrollReveal({ reset: true }).reveal(".asideLateral", {
            origin: "left",
            distance: "100px",
            duration: 1000
        })
    }, [])

    return (
        <div>
            <Navbar />
            <div className='FullListFilmes'>
                <aside className='asideLateral'>
                    <nav className='contentLateral'>
                        <h1>Lista de Filmes</h1>
                        <ul className='listContentLateral'>
                            <li><Link onClick={scrollTopHeader} to="/Lista_Completa">Todos os filmes</Link></li>
                            {generos.map(res => (
                                <li><Link onClick={scrollTopHeader} to={`/Lista_Completa/${res.genero}`}>{res.genero}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className='mainLateral'>
                    <div ref={headerListFull} className="headerListFull">
                        <div className='textHeaderListFull'>
                            <h1>{movieListFull.length != 0 && moviesListFullGenre.length != 0 ? (genero ? `Filmes de ${genero}` : `${msgShowFilmes[0]}`) : (genero ? "Gênero não encontrado" : (movieListFull.length == 0 ? "Lista indisponível" : `${msgShowFilmes[0]}`))}</h1>

                            {movieListFull.length != 0 && moviesListFullGenre.length != 0 ? (genero ? <p>{`Essa é a lista completa de filmes de ${genero.toLowerCase()} que você assistiu nas telonas!`}<br />{msgShowFilmes[2]}</p> : <p>{`${msgShowFilmes[1]}`}<br />{msgShowFilmes[2]}</p>) : (genero ? <p>Lista de filmes por gênero não encontrada</p> : (movieListFull.length == 0 ? <p>A sua lista de filmes não está disponível no momento.</p> : <p>{`${msgShowFilmes[1]}`} <br />{msgShowFilmes[2]}!</p>))}
                        </div>
                    </div>
                    <div ref={selectList} className='selectList selectListFull'>
                        <p>Organizar lista:</p>
                        <select name="" id="" onChange={e => setListSelect(e.target.value)}>
                            <option value="1" selected>Mais recente</option>
                            <option value="2">Mais antigo</option>
                            <option value="3">Mais populares</option>
                        </select>
                    </div>
                    <ul className='ulListFull personalListFull'>
                        {movieListFull.length != 0 && moviesListFullGenre.length != 0 ? (genero ? listGenreTrue : listAllMovieTrue) : (genero ? defaultImgError : (movieListFull.length == 0 ? defaultImgError : listAllMovieTrue))}
                    </ul>

                    <div className='titleFooterFullFilmes'>
                        <TitleLoading animationHere={false} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default FullListFilmes;