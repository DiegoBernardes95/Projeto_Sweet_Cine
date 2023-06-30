import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/PerfilCinema.css"
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalComponent from "../components/ModalComponent";
import Forms from "../components/Forms";
import FormCinema from "../components/FormCinema";
import DelRegister from "../components/DelRegister";
import TitlesSection from "../components/TitlesSection";
import starFull from '/public/starFull.png';
import btnEdit from '/public/icons8-edit-64.png'
import btnDelete from '/public/icons8-garbage-50.png'
import Footer from "../components/Footer";
import btnBack from '/public/icons8-left-32.png';
import defaultErrorImg from '/public/movieSlice.png';
import ConversorData from "../components/ConversorData";
import TitleLoading from "../components/TitleLoading";
import ScrollReveal from "scrollreveal";
import VanillaTilt from "vanilla-tilt";

const PerfilCinema = () => {
    const { idCinema } = useParams();
    const setBackground = useRef();

    const [showLoading, setShowLoading] = useState(false);

    const [cinemaForId, setCinemaForId] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/cinema/${idCinema}`).then(res => setCinemaForId(res.data));

    }, [idCinema]);

    // Effect para colocar a imagem dá requisição como imagem de background
    useEffect(() => {
        setBackground.current.style.background = `url("${cinemaForId.foto_do_cinema}") #000000ac`;
        setBackground.current.style.backgroundRepeat = "no-repeat";
        setBackground.current.style.backgroundSize = "cover";
        setBackground.current.style.backgroundBlendMode = "darken";
        setBackground.current.style.backgroundAttachment = "fixed";

    }, [cinemaForId])

    // Requisição para mostrar os filmes por cinema
    const [moviesForCine, setMoviesForCine] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/filme_por_cinema/${idCinema}`).then(res => setMoviesForCine(res.data));
    }, [idCinema])

    // CONFIGURAÇÕES DO MODAL PARA EDITAR E DELETAR REGISTROS
    const [showModal, setShowModal] = useState(false);
    const [whatForm, setWhatForm] = useState(true);

    // FUNÇÕES PARA O SCROLL ATÉ OS ELEMENTOS
    const placar = useRef();
    const listaDeFilmes = useRef();
    const scrollPlacar = () => {
        placar.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollInfos = () => {
        setBackground.current.scrollIntoView({ behavior: "smooth" });
    }
    const scrollLista = () => {
        listaDeFilmes.current.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        ScrollReveal({ reset: true }).reveal(`.asideLateral`, {
            origin: "left",
            distance: "100px",
            duration: 1000
        })
    }, [])


    // Animação 3D com VanillaTilt
    const placarTotalFilmes = useRef();
    const placarTotalIngressos = useRef();
    VanillaTilt.init(placarTotalFilmes.current, {
        glare: true,
        reverse: true,
        "max-glare": 0.3,
        perspective: 500
    })
    VanillaTilt.init(placarTotalIngressos.current, {
        glare: true,
        reverse: true,
        "max-glare": 0.3,
        perspective: 500
    })


    // SELECT PARA ORGANIZAR LISTAS
    const selectList = useRef();
    useEffect(() => {
        if (moviesForCine.length == 0) {
            selectList.current.style.display = "none";
        } else {
            selectList.current.style.display = "flex";
        }
    }, [moviesForCine]);
    const [listSelect, setListSelect] = useState();
    let moviesSorted = [...moviesForCine];
    if (listSelect === "1") {
        moviesSorted.sort((filmeA, filmeB) => filmeA.data_view - filmeB.data_view);
    } else if (listSelect === "2") {
        moviesSorted.reverse();

    } else if (listSelect === "3") {
        moviesSorted.sort((filmeA, filmeB) => filmeA.nota - filmeB.nota).reverse()
    }

    return (
        <div>
            <ModalComponent state={showModal} modalContent={!showLoading ? <Forms setCloseModal={setShowModal} formContent={whatForm ? <FormCinema setShowLoading={setShowLoading} whatForm={whatForm} id={cinemaForId.id} nome={cinemaForId.nome} bairro={cinemaForId.bairro} cidade={cinemaForId.cidade} estado={cinemaForId.estado} foto_do_cinema={cinemaForId.foto_do_cinema} comentario={cinemaForId.comentario} nota={cinemaForId.nota} /> : <DelRegister setShowLoading={setShowLoading} closeModal={setShowModal} id={cinemaForId.id} />} /> : <TitleLoading animationHere={true} />} />
            <Navbar />
            <div className="PerfilCinema">
                <aside className="asideLateral">
                    <nav className="contentLateral">
                        <h1>{cinemaForId.nome ? cinemaForId.nome : "Desconhecido"}</h1>
                        <ul className="listContentLateral">
                            <li><button onClick={scrollInfos}>Informações do cinema</button></li>
                            <li><button onClick={scrollPlacar}>Placar</button></li>
                            <li><button onClick={scrollLista}>Filmes assistidos no cinema</button></li>
                            <li>
                                <button onClick={() => {
                                    setShowModal(true);
                                    setWhatForm(true);
                                }}>Editar informações</button>
                            </li>
                            <li>
                                <button onClick={() => {
                                    setShowModal(true);
                                    setWhatForm(false);
                                }}>Excluir registro</button>
                            </li>
                            <li className="btnBack"><Link to="/Cinemas"><img src={btnBack} alt="" /></Link></li>
                        </ul>
                    </nav>
                </aside>
                <main className="mainLateral">
                    <div ref={setBackground} className="cineTitle">
                        <div className="starsCine">
                            {Array.from({ length: cinemaForId.nota }, (_, index) => (
                                <img key={index} src={starFull} alt="" />
                            ))}
                        </div>
                        <h1>{cinemaForId.nome ? cinemaForId.nome : "Desconhecido"}</h1>
                        <p>{cinemaForId.bairro ? cinemaForId.bairro : "Desconhecido"} - {cinemaForId.cidade ? cinemaForId.cidade : "Desconhecido"}</p>
                        <p>{cinemaForId.estado ? cinemaForId.estado : "Desconhecido"}</p>
                        <div className="editAndDelete">
                            <button onClick={() => {
                                setShowModal(true);
                                setWhatForm(true);
                            }}><img src={btnEdit} alt="" /></button>
                            <button onClick={() => {
                                setShowModal(true);
                                setWhatForm(false);
                            }}><img src={btnDelete} alt="" /></button>
                        </div>
                        <cite>{cinemaForId.comentario ? cinemaForId.comentario : "Sem comentários..."}</cite>
                    </div>
                    <div ref={placar} className="placarCine">
                        <div ref={placarTotalFilmes}>
                            <h1>{cinemaForId.filmes_assistidos ? cinemaForId.filmes_assistidos : 0}</h1>
                            <p>Filmes assistidos!</p>
                        </div>
                        <div ref={placarTotalIngressos}>
                            <h1>R${cinemaForId.total_de_ingressos ? cinemaForId.total_de_ingressos.toFixed(2).replace(".", ",") : 0}</h1>
                            <p>Gastos em ingressos!</p>
                        </div>
                    </div>
                    <article className="articleDescription">
                        <p>Olá,<br /><span>{sessionStorage.getItem("name")}!</span></p>
                        <p>Essa é sua lista de filmes assistido no cinema <span>{cinemaForId.nome}</span>. <br />Reviva cada momento!</p>
                    </article>
                    <section className="sectionListFilmesForCine">
                        <div ref={listaDeFilmes} className="text-center">
                            <TitlesSection title={`${cinemaForId.nome ? cinemaForId.nome : "Desconhecido"}`} setFontSize={"15px"} setBackgroundColor={"linear-gradient(#000, #0000)"} />
                        </div>
                        <div ref={selectList} className="selectList">
                            <p>Organizar lista:</p>
                            <select name="" id="" onChange={e => setListSelect(e.target.value)}>
                                <option value="1" selected>Mais recente</option>
                                <option value="2">Mais antigo</option>
                                <option value="3">Mais populares</option>
                            </select>
                        </div>
                        <ul className="ulListFull listFull">
                            {moviesForCine.length != 0 ? moviesSorted.map(res => (
                                <li className="ulListFullContent listCinesContent">
                                    <Link to={`/Filmes/${res.id}`}>
                                        {res.capa ? <img src={res.capa} alt="" /> : <img src='https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png' alt='' />}
                                        <div className="ulListFullContentDescription listCinesTextContent">
                                            <div className="fullListNote">
                                                {Array.from({ length: res.nota }, (_, index) => (
                                                    <img key={index} src={starFull} alt="" />
                                                ))}
                                            </div>
                                            <p>{res.titulo}</p>
                                            <sub>{res.data_view ? <ConversorData data={res.data_view} /> : "data indisponível"} - {res.genero}</sub>
                                            <p className='fullListSinopse fullListSinopse2'>{res.sinopse ? res.sinopse : "Sinopse indisponível..."}</p>
                                        </div>
                                    </Link>
                                </li>
                            )) :
                                <li className="defaultErrorImg">
                                    <img src={defaultErrorImg} alt="" />
                                    <p>Nenhum filme encontrado...</p>
                                </li>
                            }
                        </ul>
                        <TitleLoading animationHere={false}/>
                    </section>
                    
                    <Footer />
                </main>
            </div>
        </div>
    )
}

export default PerfilCinema;