const ListNotas = ({index}) => {
    const listNotas = ["Ruim", "Razoável", "Bom", "Muito Bom", "Ótimo", "Espetacular", "Perfeito"];

    return listNotas[index - 1];
}

export default ListNotas;