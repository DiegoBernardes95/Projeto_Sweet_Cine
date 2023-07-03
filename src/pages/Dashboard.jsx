import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import star from "/public/starfull.png";
import defaultErrorImg from "/public/movieSlice.png";
import ListNotas from "../components/ListNotas";
import ScrollReveal from "scrollreveal";

const Dashboard = () => {
    // Variáveis para scrollar até a opção clicada
    const topPlacar = useRef();
    const topCinema = useRef();
    const topFilmes = useRef();
    const topGenero = useRef();
    const topIngresso = useRef();

    // Funções para scrollar até a opção clicada
    const scrollTopCinema = () => {
        topCinema.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollTopGenero = () => {
        topGenero.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollTopFilmes = () => {
        topFilmes.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollTopIngresso = () => {
        topIngresso.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollTopPlacar = () => {
        topPlacar.current.scrollIntoView({ behavior: "smooth" });
    }

    // States para armazenar as requisições
    const [totalFilmes, setTotalFilmes] = useState([]);
    const [totalCinemas, setTotalCinemas] = useState([]);
    const [cinemaMaisFrequentado, setCinemaMaisFrequentado] = useState([]);
    const [generoMaisAssistido, setGeneroMaisAssistido] = useState([]);
    const [totalIngressos, setTotalIngressos] = useState([]);
    const [rankingFilmes, setRankingFilmes] = useState([]);
    const rankingFilmesSlice = rankingFilmes.slice(0, 10);

    useEffect(() => {
        axios.get("http://localhost:3000/total_filmes").then(res => setTotalFilmes(res.data));

        axios.get("http://localhost:3000/total_cinemas").then(res => setTotalCinemas(res.data));

        axios.get("http://localhost:3000/cinema_mais_frequentado").then(res => setCinemaMaisFrequentado(res.data));

        axios.get("http://localhost:3000/genero_mais_assistido").then(res => setGeneroMaisAssistido(res.data));

        axios.get("http://localhost:3000/total_ingressos").then(res => setTotalIngressos(res.data));

        axios.get("http://localhost:3000/filmes_por_nota").then(res => setRankingFilmes(res.data));

        ScrollReveal({reset: true}).reveal(".asideLateral" , {
            origin: "left",
            distance: "100px",
            duration: 1000
        })
    }, [])

    return (
        <div>
            <Navbar />
            <div className="Dashboard">
                <aside className="asideLateral">
                    <nav className="contentLateral">
                        <h1>Informações</h1>
                        <ul className="listContentLateral">
                            <li><button onClick={scrollTopPlacar}>Placar</button></li>
                            <li><button onClick={scrollTopCinema}>Cinema mais frequentado</button></li>
                            <li><button onClick={scrollTopGenero}>Gênero mais assistido</button></li>
                            <li><button onClick={scrollTopIngresso}>Valor total dos ingressos</button></li>
                            <li><button onClick={scrollTopFilmes}>Ranking</button></li>
                        </ul>
                    </nav>
                </aside>
                <main className="mainLateral mainDashboard">
                    <section className="sectionContent">
                        <div ref={topPlacar} className="contentDashboard topPlacar">
                            <div className="placar">
                                <h1>Placar</h1>
                                <p><span>{totalFilmes.total_filmes ? totalFilmes.total_filmes : 0}</span> filmes foram assistidos por você até o momento!</p>
                                <p><span>{totalCinemas.total_cinemas ? totalCinemas.total_cinemas : 0}</span> cinemas foram frequentados por você até o momento!</p>
                            </div>
                        </div>
                        <div ref={topCinema} className="contentDashboard topCinema">
                            <div className="placar">
                                <h1>Cinema</h1>
                                <p>O cinema mais frequentado por você foi o...</p>
                                <span>{cinemaMaisFrequentado.nome ? <Link to={`/Cinema/${cinemaMaisFrequentado.idCinema}`}>{cinemaMaisFrequentado.nome}</Link> : "cinema desconhecido"}</span>
                                <p>com</p>
                                <p><span>{cinemaMaisFrequentado.filmes_assistidos ? cinemaMaisFrequentado.filmes_assistidos : 0}</span> filmes assistidos</p>
                            </div>
                        </div>
                        <div ref={topGenero} className="contentDashboard topGenero">
                            <div className="placar">
                                <h1>Gênero</h1>
                                <p>O gênero mais assistido por você foi...</p>
                                <span>{generoMaisAssistido.genero ? <Link to={`/Lista_Completa/${generoMaisAssistido.genero}`}>{generoMaisAssistido.genero}</Link> : "gênero desconhecido"}</span>
                                <p>com</p>
                                <p><span>{generoMaisAssistido.contadorGenero ? generoMaisAssistido.contadorGenero : 0}</span> filmes assistidos</p>
                            </div>
                        </div>
                        <div ref={topIngresso} className="contentDashboard topIngressos">
                            <div className="placar">
                                <h1>Ingressos</h1>
                                <p>O valor total gasto em ingressos por você até o momento foi de ...</p>
                                <span>R${totalIngressos.total_ingresso ? totalIngressos.total_ingresso.toFixed(2).replace(".", ",") : 0}</span>
                            </div>
                        </div>
                        <div ref={topFilmes} className="contentDashboard topFilmes">
                            <div className="placar">
                                <h1>Ranking</h1>
                                <p>Esse é o Top 10 dos filmes mais bem avaliados por você...</p>
                                <ul className="listRanking">
                                    {rankingFilmes.length != 0 ? rankingFilmesSlice.map(res => (
                                        <li>
                                            <Link to={`/Filmes/${res.id}`}><img src={res.poster ? res.poster : "https://img.freepik.com/vetores-gratis/glitch-error-404-page_23-2148105404.jpg?w=2000"} alt="" /></Link>
                                            <div>
                                                {Array.from({length: res.nota}, (_, index) => (
                                                    <img key={index} className="starFull" src={star} alt="" />
                                                ))}
                                            </div>
                                            <span>{<ListNotas index={res.nota}/>}</span>
                                            <p>{res.titulo}</p>
                                        </li>
                                    )) : 
                                        <div>
                                            <img className="h-75" src={defaultErrorImg} alt="" />
                                            <p>Sem registros...</p>
                                        </div>
                                    }
                                </ul>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default Dashboard;