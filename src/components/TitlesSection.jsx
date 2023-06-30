import "../App.css";
import { useEffect, useRef } from "react";

const TitlesSection = ({title, setBackgroundColor, setFontSize}) => {
    const setBackground = useRef();
    const setFont = useRef();
    useEffect(() => {
        setBackground.current.style.background = setBackgroundColor;
        setFont.current.style.fontSize = setFontSize;   
    })

    return (
        <div ref={setBackground} className="titleMoviesList">
            <div></div>
            <h1 ref={setFont}>{title}</h1>
            <div></div>
        </div>
    )
}

export default TitlesSection;