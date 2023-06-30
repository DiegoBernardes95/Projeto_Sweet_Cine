import { openDb } from '../infra/configDB.js';

class CreateTableFilme{
    static filme(){
        const db = openDb();
        db.then( db => {
            db.exec('CREATE TABLE IF NOT EXISTS filme(id INTEGER PRIMARY KEY AUTOINCREMENT, idCinema INTEGER, poster TEXT, capa TEXT, titulo VARCHAR(60), genero VARCHAR(30), data_view DATE, ingresso NUMERIC(4,2), comentario TEXT, sinopse TEXT, nota REAL, FOREIGN KEY (idCinema) REFERENCES cinema (id))')
        })
    }
}

export default CreateTableFilme;