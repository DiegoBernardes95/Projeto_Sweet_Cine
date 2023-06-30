import { useState } from "react";
import "../styles/stylesComponents/Forms.css";

const UserName = ({ setShowLoading }) => {
    const [nameUser, setNameUser] = useState();

    const submitHandle = (e) => {
        e.preventDefault();
        sessionStorage.setItem('name', nameUser);
        setShowLoading(true);
        setTimeout(() => {
            window.location.href = `/Home/${sessionStorage.getItem("name")}`;
        }, 2000);

    }

    return (
        <main className="formCurrentMain currentInputName">
            <h1>Informe seu nome</h1>
            <form action="" className="formCurrent inputName" onSubmit={submitHandle}>
                <div className="formCurrentPartOne">
                    <label htmlFor="">
                        <span>Nome:</span>
                        <input type="text" required onChange={e => setNameUser(e.target.value)} />
                    </label>
                </div>
                <button className="btnForm mt-2">Salvar</button>
            </form>
        </main>
    )
}

export default UserName;