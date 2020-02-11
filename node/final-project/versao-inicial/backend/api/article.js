const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const { existsOrError } = app.api.validation;

    const save = async (req, res) => {
        const article = { ...req.body };

        if (req.params.id) article.id = req.params.id;

        try {
            existsOrError(article.name, 'Name not informed');
            existsOrError(article.description, 'Description not informed');
            existsOrError(article.categoryId, 'CategoryId not informed');
            existsOrError(article.userId, 'UserId not informed');
            existsOrError(article.content, 'Content not informed');
        }

        catch (msg) {
            return res.status(400).send(msg);
        }

        if (article.id) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }

        else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    };

    const remove = async (req, res) => {
        try {
            // .del() returns the number of affected lines
            const deletedRows = await app.db('articles')
                .where({ id: req.params.id }).del();

            try {
                existsOrError(deletedRows, 'Article not found');
            }
            
            catch (msg) {
                return res.status(400).send(msg);
            }
    
            return res.status(204).send();
        }
        
        catch (msg) {
            return res.status(500).send(msg);
        }
    };

    const limit = 10;

    const get = async (req, res) => {
        const page = req.query.page || 1;

        const result = await app.db('articles').count('id').first();
        const count = parseInt(result.count);

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(limit * (page - 1))
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err));
    };

    const getById = async (req, res) => {
        app.db('articles')
            .where({ id: req.params.id }).first()
            .then(article => {
                article.content = article.content.toString();
                return res.json(article);
            })
            .catch(err => res.status(500).send(err));
    };

    return { save, remove, get, getById };
};
