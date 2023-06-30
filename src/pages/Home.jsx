import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import ScrollReveal from "scrollreveal";
import VanillaTilt from "vanilla-tilt";
import TitleLoading from '../components/TitleLoading';

const Home = () => {
    const name = sessionStorage.getItem("name");
    const [totalFilmes, setTotalFilmes] = useState([]);
    const [totalCinemas, setTotalCinemas] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/total_filmes").then(res => setTotalFilmes(res.data));

        axios.get("http://localhost:3000/total_cinemas").then(res => setTotalCinemas(res.data));

        // Efeito de Scroll

        ScrollReveal({ reset: false }).reveal(".scrollTitleOne", {
            origin: "top",
            distance: "60px",
            duration: 2000
        })
        ScrollReveal({ reset: false }).reveal(".scrollTitleTwo", {
            origin: "top",
            distance: "30px",
            delay: 600,
            duration: 2000
        })

        ScrollReveal({reset: true}).reveal(".asideLateral" , {
            origin: "left",
            distance: "100px",
            duration: 1000
        })

    }, [])

    const headerHome = useRef();
    const placarCine = useRef();
    const sweetCine = useRef();
    const funcionalidades = useRef();
    const duvidas = useRef();

    const scrollToHeaderHome = () => {
        headerHome.current.scrollIntoView({behavior: "smooth"});
    }
    const scrollToPlacarCine = () => {
        placarCine.current.scrollIntoView({behavior: "smooth"});
    }

    const scrollToSweetCine = () => {
        sweetCine.current.scrollIntoView({behavior: "smooth"});
    }

    const scrollToFuncionalidades = () => {
        funcionalidades.current.scrollIntoView({behavior: "smooth"});
    }

    const scrollToDuvidas = () => {
        duvidas.current.scrollIntoView({behavior: "smooth"});
    }

    // Animação 3D com VanillaTilt
    const placarTotalFilmes = useRef();
    const placarTotalCinemas = useRef();
    VanillaTilt.init(placarTotalFilmes.current, {
        glare: true,
        reverse: true,
        "max-glare": 0.3,
        perspective: 500
        
    })
    VanillaTilt.init(placarTotalCinemas.current, {
        glare: true,
        reverse: true,
        "max-glare": 0.3,
        perspective: 500
    })


    return (
        <>
            <Navbar />
            <div className="Home">
                <aside className="asideLateral">
                    <nav className="contentLateral">
                        <h1>Home</h1>
                        <ul className="listContentLateral">
                            <li>
                                <button onClick={scrollToHeaderHome}>Apresentação</button>
                            </li>
                            <li>
                                <button onClick={scrollToPlacarCine}>Placar</button>
                            </li>
                            <li>
                                <button onClick={scrollToSweetCine}>O que é o Sweet Cine?</button>
                            </li>
                            <li>
                                <button onClick={scrollToFuncionalidades}>Funcionalidades</button>
                            </li>
                            <li>
                                <button onClick={scrollToDuvidas}>Dúvidas?</button>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="mainLateral">
                    <div ref={headerHome} className="headerHome">
                        <div className="titleHome">
                            <h2 className="scrollTitleOne">Seja bem-vindo,</h2>
                            <h2 className="scrollTitleTwo">{name}!</h2>
                        </div>
                    </div>
                    <article ref={placarCine} className="placarCine">
                        <div ref={placarTotalFilmes}>
                            <h1>{totalFilmes.total_filmes ? totalFilmes.total_filmes : 0}</h1>
                            <p>Filmes assistidos!</p>
                        </div>
                        <div ref={placarTotalCinemas}>
                            <h1>{totalCinemas.total_cinemas ? totalCinemas.total_cinemas : 0}</h1>
                            <p>Cinemas frequentados!</p>
                        </div>
                    </article>
                    <section className="sectionHome">
                        <div ref={sweetCine} className="sectionTitleHome">
                            <h1>O que é o Sweet Cine?</h1>
                            <p>O Sweet Cine é o lugar perfeito para você guardar os momentos especiais que a sétima arte te proporcionou.
                            <br />
                            Aqui você vai poder catalogar todos os filmes que já assistiu no cinema, salvar suas informações, deixar um comentário, uma nota e ainda ter acesso a um levantamento personalizado sobre sua jornada como cinéfilo.
                            <br />
                            O Sweet Cine é seu lugar para guardar o inesquecível!</p>
                        </div>
                        <div ref={funcionalidades} className="funcionalidades">
                            <ul className="listFuncionalidades">
                                <li>
                                    <h3>Catalogue seus filmes e cinemas</h3>
                                    <p>Guarde todos os filmes que já assistiu nas telonas e todos os cinemas que já frequentou.</p>
                                </li>
                                <li>
                                    <h3>Deixe um comentário e uma nota</h3>
                                    <p>Comente sobre a sua expêriencia em cada filme e deixe uma nota.</p>
                                </li>
                                <li>
                                    <h3>Informações personalizadas</h3>
                                    <p>Confira um levantamento sobre a sua experiência como cinéfilo.</p>
                                </li>
                                <li>
                                    <h3>Simples e nostálgico</h3>
                                    <p>Sua vida como cinéfilo catalogada numa ferramenta bem fácil de usar!</p>
                                </li>
                            </ul>
                        </div>
                        <div ref={duvidas} className="sectionDuvidas">
                            <h1 className="text-center">Dúvidas?</h1>
                            <details>
                                <summary>Quanto custa?</summary>
                                <p>Nada! O Sweet Cine é gratuito. </p>
                            </details>
                            <details>
                                <summary>Há limites de uso?</summary>
                                <p>O céu é o limite! Apenas aproveite a ferramenta :)</p>
                            </details>
                        </div>
                        <TitleLoading animationHere={false}/>
                    </section>
                    <Footer />
                </main>
            </div>

        </>
    )
}

export default Home;