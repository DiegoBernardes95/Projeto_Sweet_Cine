import { useEffect, useState } from 'react';
import '../styles/stylesComponents/Forms.css';
import axios from 'axios';
import ListNotas from './ListNotas';

const FormCinema = ({setShowLoading, whatForm, id, nome, bairro, cidade, estado, foto_do_cinema, nota, comentario }) => {
    const [cineNome, setCineNome] = useState();
    const [cineBairro, setCineBairro] = useState();
    const [cineCidade, setCineCidade] = useState();
    const [cineEstado, setCineEstado] = useState();
    const [fotoCinema, setFotoCinema] = useState();
    const [cineNota, setCineNota] = useState();
    const [cineComentario, setCineComentario] = useState();

    useEffect(() => {
        setCineNome(!whatForm ? "" : nome);
        setCineBairro(!whatForm ? "" : bairro);
        setCineCidade(!whatForm ? "" : cidade);
        setCineEstado(!whatForm ? "" : estado);
        setFotoCinema(!whatForm ? "" : foto_do_cinema);
        setCineNota(!whatForm ? "" : nota);
        setCineComentario(!whatForm ? "" : comentario);
    }, [id, nome, bairro, cidade, estado, foto_do_cinema, nota, comentario]);

    const submitPostCinema = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/cinema', {
                "nome": cineNome,
                "bairro": cineBairro,
                "cidade": cineCidade,
                "estado": cineEstado,
                "foto_do_cinema": fotoCinema,
                "nota": cineNota,
                "comentario": cineComentario
            })
            setShowLoading(true);
            setTimeout(() => {
                window.location.href = '/Cinemas';
            }, 2000)
        } catch {
            alert("Erro ao cadastrar cinema.");
        }
    }

    const submitEditCinema = async (e) => {
        e.preventDefault();
        try{
            axios.put(`http://localhost:3000/cinema/${id}`, {
                "id": id,
                "nome": cineNome,
                "bairro": cineBairro,
                "cidade": cineCidade,
                "estado": cineEstado,
                "foto_do_cinema": fotoCinema,
                "nota": cineNota,
                "comentario": cineComentario
            })
            setShowLoading(true);
            setTimeout(() => {
                window.location.reload(1);
            }, 2000)
        } catch(error){
            alert("Erro ao editar cinema.");
        }
    }

    return (
        <div>
            {!whatForm ?
                // FORMULÁRIO PARA CRIAÇÃO DE REGISTROS
                <main className="formCurrentMain">
                    <h1>Cinema</h1>
                    <form action="" onSubmit={submitPostCinema} className="formCurrent">
                        <div className="formCurrentPartOne">
                            <label htmlFor="">
                                <span>Nome:</span>
                                <input type="text" required onChange={e => setCineNome(e.target.value)} placeholder='Nome do cinema...' />
                            </label>
                            <label htmlFor="">
                                <span>Bairro:</span>
                                <input type="text" required onChange={e => setCineBairro(e.target.value)} placeholder='Informe o bairro do cinema...' />
                            </label>
                            <label htmlFor="">
                                <span>Cidade:</span>
                                <input type="text" required onChange={e => setCineCidade(e.target.value)} placeholder='Informe a cidade do cinema...' />
                            </label>
                            <select name="" id="" onChange={e => setCineEstado(e.target.value)} className="formSelect">
                                <option value="" selected disabled>Estado</option>
                                <option value="Acre">Acre (AC)</option>
                                <option value="Alagoas">Alagoas (AL)
                                </option>
                                <option value="Amapá">Amapá (AP)
                                </option>
                                <option value="Amazonas">Amazonas (AM)
                                </option>
                                <option value="Bahia">Bahia (BA)
                                </option>
                                <option value="Ceará">Ceará (CE)
                                </option>
                                <option value="Distrito Federal">Distrito Federal (DF)
                                </option>
                                <option value="Espírito Santo">Espírito Santo (ES)
                                </option>
                                <option value="Goiás">Goiás (GO)
                                </option>
                                <option value="Maranhão">Maranhão (MA)
                                </option>
                                <option value="Mato Grosso">Mato Grosso (MT)
                                </option>
                                <option value="Mato Grosso do Sul">Mato Grosso do Sul (MS)
                                </option>
                                <option value="Minas Gerais">Minas Gerais (MG)
                                </option>
                                <option value="Pará">Pará (PA)
                                </option>
                                <option value="Paraíba">Paraíba (PB)
                                </option>
                                <option value="Paraná">Paraná (PR)
                                </option>
                                <option value="Pernambuco">Pernambuco (PE)
                                </option>
                                <option value="Piauí">Piauí (PI)
                                </option>
                                <option value="Rio de Janeiro">Rio de Janeiro (RJ)
                                </option>
                                <option value="Rio Grande do Norte">Rio Grande do Norte (RN)
                                </option>
                                <option value="Rio Grande do Sul">Rio Grande do Sul (RS)
                                </option>
                                <option value="Rondônia">Rondônia (RO)
                                </option>
                                <option value="Roraima">Roraima (RR)
                                </option>
                                <option value="Santa Catarina">Santa Catarina (SC)
                                </option>
                                <option value="São Paulo">São Paulo (SP)
                                </option>
                                <option value="Sergipe">Sergipe (SE)
                                </option>
                                <option value="Tocantins">Tocantins (TO)
                                </option>
                            </select>
                            <label htmlFor="">
                                <span>Foto do Cinema:</span>
                                <input type="url" onChange={e => setFotoCinema(e.target.value)} placeholder='URL da foto do cinema...' />
                            </label>
                            <label>
                                <span>Comentário:</span>
                                <textarea maxLength="500" onChange={e => setCineComentario(e.target.value)} id="" cols="30" rows="10" placeholder='Deixe um comentário sobre o cinema...'></textarea>
                            </label>
                            <select name="" onChange={e => setCineNota(e.target.value)} className="formSelect">
                                <option value="Notas" selected disabled>Notas</option>
                                <option value="1">1 - Ruim</option>
                                <option value="2">2 - Razoável</option>
                                <option value="3">3 - Bom</option>
                                <option value="4">4 - Muito bom</option>
                                <option value="5">5 - Ótimo</option>
                                <option value="6">6 - Espetacular</option>
                                <option value="7">7 - Perfeito</option>
                            </select>
                        </div>
                        <button className="btnForm2">Salvar</button>
                    </form>
                </main>
                // FORMULÁRIO PARA EDIÇÃO DE INFORMAÇÕES
                : <main className="formCurrentMain">
                    <h1>Editar</h1>
                    <form action="" onSubmit={submitEditCinema} className="formCurrent">
                        <div className="formCurrentPartOne">
                            <label htmlFor="">
                                <span>Nome:</span>
                                <input type="text" value={cineNome} required onChange={e => setCineNome(e.target.value)} placeholder='Nome do cinema...' />
                            </label>
                            <label htmlFor="">
                                <span>Bairro:</span>
                                <input type="text" value={cineBairro} required onChange={e => setCineBairro(e.target.value)} placeholder='Informe o bairro do cinema...' />
                            </label>
                            <label htmlFor="">
                                <span>Cidade:</span>
                                <input type="text" value={cineCidade} required onChange={e => setCineCidade(e.target.value)} placeholder='Informe a cidade do cinema...' />
                            </label>
                            <select name="" id="" onChange={e => setCineEstado(e.target.value)} className="formSelect">
                                <option value={cineEstado} selected>{cineEstado}</option>
                                <option value="Acre">Acre (AC)</option>
                                <option value="Alagoas">Alagoas (AL)
                                </option>
                                <option value="Amapá">Amapá (AP)
                                </option>
                                <option value="Amazonas">Amazonas (AM)
                                </option>
                                <option value="Bahia">Bahia (BA)
                                </option>
                                <option value="Ceará">Ceará (CE)
                                </option>
                                <option value="Distrito Federal">Distrito Federal (DF)
                                </option>
                                <option value="Espírito Santo">Espírito Santo (ES)
                                </option>
                                <option value="Goiás">Goiás (GO)
                                </option>
                                <option value="Maranhão">Maranhão (MA)
                                </option>
                                <option value="Mato Grosso">Mato Grosso (MT)
                                </option>
                                <option value="Mato Grosso do Sul">Mato Grosso do Sul (MS)
                                </option>
                                <option value="Minas Gerais">Minas Gerais (MG)
                                </option>
                                <option value="Pará">Pará (PA)
                                </option>
                                <option value="Paraíba">Paraíba (PB)
                                </option>
                                <option value="Paraná">Paraná (PR)
                                </option>
                                <option value="Pernambuco">Pernambuco (PE)
                                </option>
                                <option value="Piauí">Piauí (PI)
                                </option>
                                <option value="Rio de Janeiro">Rio de Janeiro (RJ)
                                </option>
                                <option value="Rio Grande do Norte">Rio Grande do Norte (RN)
                                </option>
                                <option value="Rio Grande do Sul">Rio Grande do Sul (RS)
                                </option>
                                <option value="Rondônia">Rondônia (RO)
                                </option>
                                <option value="Roraima">Roraima (RR)
                                </option>
                                <option value="Santa Catarina">Santa Catarina (SC)
                                </option>
                                <option value="São Paulo">São Paulo (SP)
                                </option>
                                <option value="Sergipe">Sergipe (SE)
                                </option>
                                <option value="Tocantins">Tocantins (TO)
                                </option>
                            </select>
                            <label htmlFor="">
                                <span>Foto do Cinema:</span>
                                <input type="url" value={fotoCinema} onChange={e => setFotoCinema(e.target.value)} placeholder='URL da foto do cinema...' />
                            </label>
                            <label>
                                <span>Comentário:</span>
                                <textarea maxLength="500" value={cineComentario} onChange={e => setCineComentario(e.target.value)} id="" cols="30" rows="10" placeholder='Deixe um comentário sobre o cinema...'></textarea>
                            </label>
                            <select name="" onChange={e => setCineNota(e.target.value)} className="formSelect">
                                <option value={cineNota} selected disabled>{nota} - {<ListNotas index={cineNota}/>}</option>
                                <option value="1">1 - Ruim</option>
                                <option value="2">2 - Razoável</option>
                                <option value="3">3 - Bom</option>
                                <option value="4">4 - Muito bom</option>
                                <option value="5">5 - Ótimo</option>
                                <option value="6">6 - Espetacular</option>
                                <option value="7">7 - Perfeito</option>
                            </select>

                        </div>
                        <button className="btnForm2">Salvar</button>
                    </form>
                </main>}
        </div>
    )
}

export default FormCinema;