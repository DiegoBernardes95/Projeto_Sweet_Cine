import '../App.css'
import { useEffect, useRef } from 'react';

const TitleFooter = ({animationHere}) => {
    const titleLoading = useRef();
    const titleLoadingH1 = useRef();
    const subTitleLoading = useRef();

    useEffect(() => {
        if(animationHere){
            titleLoading.current.style.animation = "letterMin normal 2s";
            titleLoading.current.style.transition = "all .4s ease-in-out";
            titleLoadingH1.current.style.fontSize = "60px"
            subTitleLoading.current.style.fontSize = "30px";
            subTitleLoading.current.style.animation = "opacityNow normal 5s";
            subTitleLoading.current.style.transition = "all .4s ease-in-out";
        } 
    }, [animationHere])

    return(
        <div className='titleFooterFullList'>
                <div ref={titleLoading}>
                    <h1 ref={titleLoadingH1}>Sweet</h1>
                </div>
                <h3 ref={subTitleLoading}>O lar do inesquecível</h3>
        </div>
    )
}
export default TitleFooter;