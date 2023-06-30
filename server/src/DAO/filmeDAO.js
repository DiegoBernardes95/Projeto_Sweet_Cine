import { openDb } from "../infra/configDB.js";
const db = openDb();

export default class FilmeDAO{
    static listarFilme(req, res){
        const query = 'SELECT f.id, f.idCinema, COALESCE(c.nome, "Nenhum cinema cadastrado") AS cinema_assistido, f.titulo, f.genero, f.data_view, f.ingresso, f.comentario, f.sinopse, f.nota, f.poster, f.capa FROM filme f LEFT JOIN cinema c ON c.id = f.idCinema ORDER BY f.data_view DESC';
        db.then(db => {
            db.all(query).then(filme => res.json(filme));
        })
    }

    static listarFilmeId(req, res){
        const query = 'SELECT f.id, f.idCinema, COALESCE(c.nome, "Nenhum cinema cadastrado") AS cinema_assistido, f.titulo, f.genero, f.data_view, f.ingresso, f.comentario, f.sinopse, f.nota, f.poster, f.capa FROM filme f LEFT JOIN cinema c ON c.id = f.idCinema WHERE f.id = ?';
        const id = req.params.id;
        db.then(db => {
            db.get(query, [id]).then(filmeId => res.json(filmeId));
        })
    }

    static listarUltimoFilme(req, res){
        const query = 'SELECT f.id, f.idCinema, COALESCE(c.nome, "Nenhum cinema cadastrado") AS cinema_assistido, f.titulo, f.genero, f.data_view, f.ingresso, f.comentario, f.sinopse, f.nota, f.poster, f.capa FROM filme f LEFT JOIN cinema c ON c.id = f.idCinema ORDER BY f.data_view DESC LIMIT 1';
        db.then(db => {
            db.get(query).then(lastMovie => res.json(lastMovie));
        })
    }

    static postarFilme(req, res){
        const query = 'INSERT INTO filme(idCinema, poster, capa, titulo, genero, data_view, ingresso, comentario, sinopse, nota) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const filme = req.body;
        db.then(db => {
            db.run(query, [filme.idCinema, filme.poster, filme.capa, filme.titulo, filme.genero, filme.data_view, filme.ingresso, filme.comentario, filme.sinopse, filme.nota]);
        })
        res.json({
            "statusCode": "200"
        })
    }

    static editarFilme(req, res){
        const query = 'UPDATE filme SET idCinema = ?, poster = ?, capa = ?, titulo = ?, genero = ?, data_view = ?, ingresso = ?, comentario = ?, sinopse = ?, nota = ? WHERE id = ?';
        const filme = req.body;
        db.then(db => {
            db.run(query, [filme.idCinema, filme.poster, filme.capa, filme.titulo, filme.genero, filme.data_view, filme.ingresso, filme.comentario, filme.sinopse, filme.nota, filme.id]);
        })
        res.json({
            "statusCode": "200"
        })
    }

    static deletarFilme(req, res){
        const query = 'DELETE FROM filme WHERE id = ?';
        const id = req.params.id;
        db.then(db => {
            db.run(query, [id])
        })
        res.json({
            "statusCode": "200"
        })
    }

    static generoMaisAssistido(req, res){
        const query = 'SELECT genero, COUNT(genero) AS contadorGenero FROM filme GROUP BY genero ORDER BY contadorGenero DESC LIMIT 1';
        db.then(db => {
            db.get(query).then(genero => res.json(genero));
        })

    }

    static totalIngresso(req, res){
        const query = 'SELECT SUM(ingresso) AS total_ingresso FROM filme';
        db.then(db => {
            db.get(query).then(totalngresso => res.json(totalngresso));
        })
    }

    static totalFilmes(req, res){
        const query = 'SELECT COUNT(*) AS total_filmes FROM filme';
        db.then(db => {
            db.get(query).then(filmes => res.json(filmes));
        })
    }

    static filmePorNota(req, res){
        const query = 'SELECT f.id, f.idCinema, COALESCE(c.nome, "Nenhum cinema cadastrado") AS cinema_assistido, f.titulo, f.genero, f.data_view, f.ingresso, f.comentario, f.sinopse, f.nota, f.poster, f.capa FROM filme f LEFT JOIN cinema c ON c.id = f.idCinema ORDER BY f.nota DESC';
        db.then(db => {
            db.all(query).then(filmePorNota => res.json(filmePorNota));
        })
    }

    static filmesPorGenero(req, res){
        const query = 'SELECT f.id, f.idCinema, COALESCE(c.nome, "Nenhum cinema cadastrado") AS cinema_assistido, f.titulo, f.genero, f.data_view, f.ingresso, f.comentario, f.sinopse, f.nota, f.poster, f.capa FROM filme f LEFT JOIN cinema c ON c.id = f.idCinema WHERE f.genero = ? ORDER BY f.data_view DESC';
        const genero = req.params.genero;
        db.then(db => {
            db.all(query, [genero]).then(porGenero => res.json(porGenero));
        })
    }

    static contadorGenero(req, res){
        const query = 'SELECT f.genero, COUNT(f.genero) AS qtd_de_filmes, f.titulo, f.poster FROM filme f JOIN ( SELECT genero, MAX(data_view) AS max_data_view FROM filme GROUP BY genero ) t ON f.genero = t.genero AND f.data_view = t.max_data_view GROUP BY f.genero, f.titulo, f.poster ORDER BY max_data_view DESC;';
        db.then(db => {
            db.all(query).then(contador => res.json(contador));
        })
    }

    static listarFilmePorCinema(req, res){
        const query = 'SELECT f.id, f.idCinema, c.nome, f.poster, f.capa, f.titulo, f.genero, f.data_view, f.ingresso, f.comentario, f.sinopse, f.nota FROM filme f INNER JOIN cinema c on f.idCinema = c.id WHERE f.idCinema = ? ORDER BY f.data_view DESC';
        const id = req.params.id;
        db.then(db => {
            db.all(query, [id]).then(lista => res.json(lista));
        })
    }
}