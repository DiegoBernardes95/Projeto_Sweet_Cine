import { useState, useEffect } from 'react';
import '../styles/stylesComponents/Forms.css';
import axios from 'axios';
import ListNotas from './ListNotas';

const FormFilme = ({ setCadCine, toForm, id, idCinema, cinema_assistido, poster, capa, titulo, genero, data_view, ingresso, comentario, sinopse, nota, setShowLoading}) => {

    const [movieTitulo, setMovieTitulo] = useState();
    const [moviePoster, setMoviePoster] = useState();
    const [movieCapa, setMovieCapa] = useState();
    const [movieGenero, setMovieGenero] = useState();

    // O state retorna o resultado do get com todos os cinemas no banco de dados para ser exibido no select como option, que irão exibir os nomes dos cinemas e o id deles no seu value para ser armazenado no state que será usado no post
    const [cinema, setCinema] = useState([]);
    const [movieIdCinema, setMovieIdCinema] = useState();

    const [movieData, setMovieData] = useState();

    const [movieIngresso, setMovieIngresso] = useState();
    const [movieNota, setMovieNota] = useState();
    const [movieComentario, setMovieComentario] = useState();
    const [movieSinopse, setMovieSinopse] = useState();

    // Cadastrar o gênero do filme
    const [selectGen, setSelectGen] = useState([]);
    const [checkSelectGen, setCheckSelectGen] = useState(false);
    const inputGen = (e) => {
        if (e.target.value == "Escrever gênero") {
            setCheckSelectGen(true);
        } else {
            setMovieGenero(e.target.value);
        }
    }

    const backSelect = () => {
        setCheckSelectGen(false);
    }


    useEffect(() => {
        axios.get('http://localhost:3000/cinema').then(res => setCinema(res.data));

        axios.get('http://localhost:3000/contador_genero').then(res => setSelectGen(res.data));
    }, []);

    const submitFormFilm = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/filme", {
                "idCinema": movieIdCinema,
                "poster": moviePoster,
                "capa": movieCapa,
                "titulo": movieTitulo,
                "genero": movieGenero,
                "data_view": movieData,
                "ingresso": movieIngresso,
                "comentario": movieComentario,
                "sinopse": movieSinopse,
                "nota": movieNota
            })
            setShowLoading(true);
            setTimeout(() => {
                window.location.href = '/Filmes';
            }, 2000);
        } catch (error) {
            alert("Erro ao cadastrar filme!");
        }
    }

    // Função para setar o cinema ou cadastrar um novo cinema
    const selectClicked = (e) => {
        if (e.target.value === "Cadastrar cinema") {
            setCadCine(true);
        } else {
            setMovieIdCinema(e.target.value);
        }
    }

    // EDITAR UM FILME
    useEffect(() => {
        setMovieTitulo(toForm ? "" : titulo);
        setMoviePoster(toForm ? "" : poster);
        setMovieCapa(toForm ? "" : capa);
        setMovieGenero(toForm ? "" : genero);
        setMovieIdCinema(toForm ? "" : idCinema);
        setMovieData(toForm ? "" : data_view);
        setMovieIngresso(toForm ? "" : ingresso);
        setMovieNota(toForm ? "" : nota);
        setMovieComentario(toForm ? "" : comentario);
        setMovieSinopse(toForm ? "" : sinopse);

    }, [titulo, poster, capa, genero, data_view, ingresso, nota, comentario, sinopse])

    const editMovie = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/filme/${id}`, {
                "id": id,
                "idCinema": movieIdCinema,
                "poster": moviePoster,
                "capa": movieCapa,
                "titulo": movieTitulo,
                "genero": movieGenero,
                "data_view": movieData,
                "ingresso": movieIngresso,
                "comentario": movieComentario,
                "sinopse": movieSinopse,
                "nota": movieNota
            })
            setShowLoading(true);
            setTimeout(() => {
                window.location.reload(1);
            }, 2000)
            
        } catch (error) {
            alert("Erro ao atualizar informações!");
        }

    }

    return (
        <div>
            {toForm ?
                // FORMULÁRIO PARA POSTAR UM FILME
                <main className="formCurrentMain">
                    <h1>Filme</h1>
                    <form action="" onSubmit={submitFormFilm} className="formCurrent">
                        <div className="formCurrentPartOne">
                            <label htmlFor="">
                                <span>Titulo:</span>
                                <input type="text" onChange={e => setMovieTitulo(e.target.value)} placeholder='Título do filme...' required />
                            </label>
                            <label htmlFor="">
                                <span>Pôster do Filme:</span>
                                <input type="url" onChange={e => setMoviePoster(e.target.value)} placeholder='URL da imagem do pôster...' />
                            </label>
                            <label htmlFor="">
                                <span>Capa do Filme:</span>
                                <input type="url" onChange={e => setMovieCapa(e.target.value)} placeholder='URL da imagem da capa...' />
                            </label>
                        </div>
                        <div className="formCurrentPartTwo">
                            <label htmlFor="">
                                <span>Gênero:</span>
                                {!checkSelectGen ?
                                    <select name="" id="" onChange={inputGen} required>
                                        <option value="" selected disabled>Escolha um gênero</option>
                                        <option value="Escrever gênero" >Escrever gênero</option>
                                        {selectGen.map(generos =>
                                            <option value={generos.genero}>{generos.genero}</option>
                                        )}
                                    </select>
                                    :
                                    <div className='d-flex gap-1'>
                                        <input type="text" onChange={e => setMovieGenero(e.target.value)} required placeholder='Informe o gênero...' />
                                        <button onClick={backSelect} className='btnForm'>Opções</button>
                                    </div>}
                            </label>
                            <label htmlFor="">
                                <span>Cinema:</span>
                                <select name="" id="" onChange={selectClicked} required>
                                    <option value="" selected disabled>Escolha um cinema</option>
                                    <option value="Cadastrar cinema" >Cadastrar cinema</option>
                                    {cinema.map(cinemas =>
                                        <option value={cinemas.id}>{cinemas.nome}</option>
                                    )}
                                </select>
                            </label>
                            <label htmlFor="">
                                <span>Data:</span>
                                <input className='w-100' type="date" onChange={e => setMovieData(e.target.value)} />
                            </label>
                        </div>
                        <div className="formCurrentPartThree">
                            <label htmlFor="">
                                <span>Ingresso: R$</span>
                                <input type="text" pattern="[0-9.]+" title="Somente números e o caractere ponto são permitidos..." onChange={e => setMovieIngresso(e.target.value)} placeholder='00.00' />
                            </label>

                            <select className='' name="" id="" onChange={e => setMovieNota(e.target.value)} required>
                                <option value="" selected disabled className='text-center'>Nota</option>
                                <option value="1">1 - Péssimo</option>
                                <option value="2">2 - Razoável</option>
                                <option value="3">3 - Bom</option>
                                <option value="4">4 - Muito Bom</option>
                                <option value="5">5 - Ótimo</option>
                                <option value="6">6 - Espetacular</option>
                                <option value="7">7 - Perfeito</option>
                            </select>
                        </div>
                        <div className="formCurrentTextArea">
                            <label htmlFor="">
                                <span>Sinopse:</span>
                                <textarea onChange={e => setMovieSinopse(e.target.value)} placeholder='Informe a sinopse do filme...'></textarea>
                            </label>
                            <label htmlFor="">
                                <span>Comentário:</span>
                                <textarea name="" id="" onChange={e => setMovieComentario(e.target.value)} placeholder='Deixe um comentário sobre a experiência vivida...'></textarea>
                            </label>

                        </div>
                        <button type='submit' className="btnForm">Salvar</button>
                    </form>
                </main> :
                // FORMULÁRIO PARA EDITAR INFORMAÇÕES
                <main className="formCurrentMain">
                    <h1>Editar</h1>
                    <form action="" onSubmit={editMovie} className="formCurrent">
                        <div className="formCurrentPartOne">
                            <label htmlFor="">
                                <span>Titulo:</span>
                                <input type="text" value={movieTitulo} onChange={e => setMovieTitulo(e.target.value)} placeholder='Título do filme...' required />
                            </label>
                            <label htmlFor="">
                                <span>Pôster do Filme:</span>
                                <input type="url" value={moviePoster} onChange={e => setMoviePoster(e.target.value)} placeholder='URL da imagem do pôster...' />
                            </label>
                            <label htmlFor="">
                                <span>Capa do Filme:</span>
                                <input type="url" value={movieCapa} onChange={e => setMovieCapa(e.target.value)} placeholder='URL da imagem da capa...' />
                            </label>
                        </div>
                        <div className="formCurrentPartTwo">
                            <label htmlFor="">
                                <span>Gênero:</span>
                                {!checkSelectGen ?
                                    <select name="" id="" onChange={inputGen} required>
                                        <option value={genero} selected>{genero}</option>
                                        <option value="Escrever gênero" >Escrever gênero</option>
                                        {selectGen.map(generos =>
                                            <option value={generos.genero}>{generos.genero}</option>
                                        )}
                                    </select>
                                    :
                                    <div className='d-flex gap-1'>
                                        <input type="text" onChange={e => setMovieGenero(e.target.value)} required placeholder='Informe o gênero...' />
                                        <button onClick={backSelect} className='btnForm'>Opções</button>
                                    </div>}
                            </label>
                            <label htmlFor="">
                                <span>Cinema:</span>
                                <select name="" id="" onChange={selectClicked} required>
                                    <option value={idCinema} selected>{cinema_assistido}</option>
                                    <option value="Cadastrar cinema" >Cadastrar cinema</option>
                                    {cinema.map(cinemas =>
                                        <option value={cinemas.id}>{cinemas.nome}</option>
                                    )}
                                </select>
                            </label>
                            <label htmlFor="">
                                <span>Data:</span>
                                <input className='w-100' type="date" value={movieData} onChange={e => setMovieData(e.target.value)} />
                            </label>
                        </div>
                        <div className="formCurrentPartThree">
                            <label htmlFor="">
                                <span>Ingresso: R$</span>
                                <input type="text" pattern='[0-9.]+' title='Somente números e o caractete ponto são permitidos...' value={movieIngresso} onChange={e => setMovieIngresso(e.target.value)} placeholder='00.00' />
                            </label>
                            <label htmlFor="">
                                <select className='' name="" id="" onChange={e => setMovieNota(e.target.value)} required>
                                    <option value={movieNota} selected className='text-center'>{movieNota} - {<ListNotas index={movieNota}/>}</option>
                                    <option value="1">1 - Péssimo</option>
                                    <option value="2">2 - Razoável</option>
                                    <option value="3">3 - Bom</option>
                                    <option value="4">4 - Muito Bom</option>
                                    <option value="5">5 - Ótimo</option>
                                    <option value="6">6 - Espetacular</option>
                                    <option value="7">7 - Perfeito</option>
                                </select>
                            </label>
                        </div>
                        <div className="formCurrentTextArea">
                            <label htmlFor="">
                                <span>Sinopse:</span>
                                <textarea value={movieSinopse} onChange={e => setMovieSinopse(e.target.value)} placeholder='Informe a sinopse do filme...'></textarea>
                            </label>
                            <label htmlFor="">
                                <span>Comentário:</span>
                                <textarea name="" id="" value={movieComentario} onChange={e => setMovieComentario(e.target.value)} placeholder='Deixe um comentário sobre a experiência vivida...'></textarea>
                            </label>
                        </div>
                        <button type='submit' className="btnForm">Salvar</button>
                    </form>
                </main>}
        </div>
    )
}

export default FormFilme;