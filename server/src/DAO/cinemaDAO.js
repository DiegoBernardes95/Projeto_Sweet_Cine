import { openDb } from "../infra/configDB.js";
const db = openDb();

export default class CinemaDAO{
    static listarCinema(req, res){
        const query = 'SELECT c.id, c.nome, c.bairro, c.cidade, c.estado, c.foto_do_cinema, c.nota, c.comentario, COALESCE(COUNT(f.idCinema), 0) AS filmes_assistidos, COALESCE(SUM(f.ingresso), 0) as total_de_ingressos FROM cinema c LEFT JOIN filme f ON c.id = f.idCinema GROUP BY c.id;';
        db.then(db => {
            db.all(query).then(cinema => res.json(cinema));
        })
    }

    static listarCinemaId(req, res){
        const query = 'SELECT c.id, c.nome, c.bairro, c.cidade, c.estado, c.foto_do_cinema, c.nota, c.comentario, COALESCE(COUNT(f.idCinema), 0) AS filmes_assistidos, COALESCE(SUM(f.ingresso), 0) as total_de_ingressos FROM cinema c LEFT JOIN filme f ON c.id = f.idCinema WHERE c.id = ?';
        const id = req.params.id;
        db.then(db => {
            db.get(query, [id]).then(cinemaId => res.json(cinemaId));
        })
    }

    static totalCinemas(req, res){
        const query = 'SELECT COUNT(*) as total_cinemas from cinema';
        db.then(db => {
            db.get(query).then(cinemas => res.json(cinemas));
        })
    }

    static cinemaMaisFrequentado(req, res){
        const query = 'SELECT c.nome, f.idCinema, COUNT(f.idCinema) AS filmes_assistidos FROM filme f INNER JOIN cinema c ON c.id = f.idCinema GROUP BY f.idCinema ORDER BY filmes_assistidos DESC LIMIT 1';
        db.then(db => {
            db.get(query).then(cinemaMaisFrequentado => res.json(cinemaMaisFrequentado));
        })
    }

    static postarCinema(req, res){
        const query = 'INSERT INTO cinema(nome, bairro, cidade, estado, foto_do_cinema, nota, comentario) VALUES(?, ?, ?, ?, ?, ?, ?)';
        const cinema = req.body;
        db.then(db => {
            db.run(query, [cinema.nome, cinema.bairro, cinema.cidade, cinema.estado, cinema.foto_do_cinema, cinema.nota, cinema.comentario]);
        })
        res.json({
            "statusCode": "200"
        })
    }

    static editarCinema(req, res){
        const query = 'UPDATE cinema SET nome = ?, bairro = ?, cidade = ?, estado = ?, foto_do_cinema = ?, nota = ?, comentario = ? WHERE id = ?';
        const cinema = req.body;
        db.then(db => {
            db.run(query, [cinema.nome, cinema.bairro, cinema.cidade, cinema.estado, cinema.foto_do_cinema, cinema.nota, cinema.comentario, cinema.id])
        })
        res.json({
            "statusCode": "200"
        })
    }

    static deletarCinema(req, res){
        const query = 'DELETE FROM cinema WHERE id = ?';
        const id = req.params.id;
        db.then(db => {
            db.run(query, [id])
        })
        res.json({
            "statusCode": "200"
        })
    }
}