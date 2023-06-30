import FilmeDAO from "../DAO/filmeDAO.js";

export default class FilmeController{
    static async rotas(app){
        app.get('/filme', FilmeController.listarFilme);
        app.get('/filme/:id', FilmeController.listarFilmeId);
        app.get('/ultimo_filme', FilmeController.listarUltimoFilme);
        app.get('/genero_mais_assistido', FilmeController.generoMaisAssistido);
        app.get('/total_ingressos', FilmeController.totalIngresso);
        app.get('/total_filmes', FilmeController.totalFilmes);
        app.get('/filmes_por_nota', FilmeController.filmePorNota);
        app.get('/filmes_por_genero/:genero', FilmeController.filmesPorGenero);
        app.get('/contador_genero', FilmeController.contadorGenero);
        app.get('/filme_por_cinema/:id', FilmeController.listarFilmePorCinema);
        app.post('/filme', FilmeController.postarFilme);
        app.put('/filme/:id', FilmeController.editarFilme);
        app.delete('/filme/:id', FilmeController.deletarFilme);
    }

    // Exibe o nome do gênero mais assistido e a quantidade de filmes
    static async generoMaisAssistido(req, res){
        await FilmeDAO.generoMaisAssistido(req, res);
    }

    // Exibe o valor total gasto em ingressos
    static async totalIngresso(req, res){
        await FilmeDAO.totalIngresso(req, res);
    }

    // Exibe o total de filmes cadastrados
    static async totalFilmes(req, res){
        await FilmeDAO.totalFilmes(req, res);
    }

    // Exibe o top 3 de filmes com melhor avaliação
    static async filmePorNota(req, res){
        await FilmeDAO.filmePorNota(req, res);
    }

    // Exibe a lista de filmes pertencente ao gênero informado
    static async filmesPorGenero(req, res){
        await FilmeDAO.filmesPorGenero(req, res);
    }

    // Exibe o último filme assistido
    static async listarUltimoFilme(req, res){
        await FilmeDAO.listarUltimoFilme(req, res);
    }

    // Contabiliza quantos filmes há em cada gênero
    static async contadorGenero(req, res){
        await FilmeDAO.contadorGenero(req, res);
    } 

    static async listarFilmePorCinema(req, res){
        await FilmeDAO.listarFilmePorCinema(req, res);
    }

    static async listarFilme(req, res){
        await FilmeDAO.listarFilme(req, res);
    }

    static async listarFilmeId(req, res){
        await FilmeDAO.listarFilmeId(req, res);
    }

    static async postarFilme(req, res){
        await FilmeDAO.postarFilme(req, res);
    }

    static async editarFilme(req, res){
        await FilmeDAO.editarFilme(req, res);
    }

    static async deletarFilme(req, res){
        await FilmeDAO.deletarFilme(req, res);
    }
}