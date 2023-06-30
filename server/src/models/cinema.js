import { openDb } from "../infra/configDB.js";

class CreateTableCinema{
    static cinema(){
        const db = openDb();
        db.then( db => {
            db.exec('CREATE TABLE IF NOT EXISTS cinema(id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(60), bairro VARCHAR(60), cidade VARCHAR(50), estado VARCHAR(30), foto_do_cinema TEXT, nota REAL, comentario TEXT)')
        })
    }
}

export default CreateTableCinema;