import CinemaDAO from "../DAO/cinemaDAO.js";

export default class CinemaController{
    static async rotas(app){
        app.get('/cinema', CinemaController.listarCinema);
        app.get('/cinema/:id', CinemaController.listaCinemaId);
        app.get('/total_cinemas', CinemaController.totalCinemas);
        app.get('/cinema_mais_frequentado', CinemaController.cinemaMaisFrequentado);
        app.post('/cinema', CinemaController.postarCinema);
        app.put('/cinema/:id', CinemaController.editarCinema);
        app.delete('/cinema/:id', CinemaController.deletarCinema);
    }

    // Exibe o total de cinemas cadastrados
    static async totalCinemas(req, res){
        await CinemaDAO.totalCinemas(req, res);
    }

    // Exibe o nome do cinema mais frequentado e quantos filmes forma vistos
    static async cinemaMaisFrequentado(req, res){
        await CinemaDAO.cinemaMaisFrequentado(req, res);
    }

    static async listarCinema(req, res){
        await CinemaDAO.listarCinema(req, res);
    }

    static async listaCinemaId(req, res){
        await CinemaDAO.listarCinemaId(req, res);
    }

    static async postarCinema(req, res){
        await CinemaDAO.postarCinema(req, res);
    }

    static async editarCinema(req, res){
        await CinemaDAO.editarCinema(req, res);
    }

    static async deletarCinema(req, res){
        await CinemaDAO.deletarCinema(req, res);
    }
}