import moment from "moment/moment";

const ConversorData = ({data}) => {
    
    const convertData = moment(data);
    const day = convertData.format("D");
    const mount = convertData.format("M");
    const year = convertData.format("Y");

    const mounts = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    sessionStorage.setItem("mounts", mounts[mount - 1]);

    const stringMount = sessionStorage.getItem("mounts");    
    
    return  `${day} de ${stringMount} de ${year}`;
}

export default ConversorData;