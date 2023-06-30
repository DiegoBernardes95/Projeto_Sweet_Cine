import { useEffect, useState } from 'react'
import '../styles/stylesComponents/DelRegister.css'
import axios from 'axios'

const DelRegister = ({ setShowLoading, whatDel, id, poster, titulo, closeModal }) => {

    // DELETAR FILMES
    const deleteFilme = async () => {
        await axios.delete(`http://localhost:3000/filme/${id}`)
        setShowLoading(true);
        setTimeout(() => {
            window.location.href = "/Filmes";
        }, 2000)
        
    }

    const closeDelete = () => {
        closeModal(false);
    }

    // DELETAR CINEMAS
    const [showDeleteInfos, setShowDeleteInfos] = useState([]);
    const deleteCinema = async () => {
        await axios.delete(`http://localhost:3000/cinema/${id}`)
        setShowLoading(true);
        setTimeout(() => {
            window.location.href = '/Cinemas';
        }, 2000)   
    }
    useEffect(() => {
        axios.get(`http://localhost:3000/cinema/${id}`).then(res => setShowDeleteInfos(res.data))
    }, [id])

    return (

        <div className='delRegister'>
            {whatDel ? (
                <>
                    <h4>Deseja Excluir?</h4>
                    <img src={poster} alt="" />
                    <p>{titulo}</p>
                    <div>
                        <button onClick={deleteFilme}>Sim</button>
                        <button onClick={closeDelete}>Não</button>
                    </div>
                </>
            ) : 
            (
                <>
                    <h4>Deseja Excluir?</h4>
                    <img src={showDeleteInfos.foto_do_cinema} alt="" />
                    <p>{showDeleteInfos.nome}</p>
                    <div>
                        <button onClick={deleteCinema}>Sim</button>
                        <button onClick={closeDelete}>Não</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default DelRegister;