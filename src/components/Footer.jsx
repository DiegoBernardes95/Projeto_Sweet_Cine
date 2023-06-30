import "../styles/stylesComponents/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    const nameUser = sessionStorage.getItem("name");

    return (
        <footer className="globalFooter">
            <div className="FooterLists">
                <ul>
                    <h4>Dúvidas?</h4>
                    <li><Link to={`/Home/${nameUser}`}>O que é o Sweet Cine?</Link></li>
                    <li><Link to={`/Home/${nameUser}`}>Quanto custa?</Link></li>
                    <li><Link to={`/Home/${nameUser}`}>Há limites de uso?</Link></li>
                </ul>
                <ul>
                    <h4>Contato</h4>
                    <li>Instagram</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                </ul>
            </div>
        </footer>
    )

}

export default Footer