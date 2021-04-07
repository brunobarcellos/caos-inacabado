class LivroDao {
    constructor(db){
        this._db = db;
    }

    lista() {
        return new Promise((resolved, rejectß) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros.')

                    return resolved(resultados);
                } 
            )
        });
    }
}

module.exports = LivroDao;