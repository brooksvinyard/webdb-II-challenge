const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  },
//   debug: true
}

const db = knex(knexConfig);

// localhost:3300/api/zoos
// GET app
router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    }); 
});

// localhost:3300/api/zoos/:id
// GET by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db('zoos')
    .where({ id })
    .first()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// localhost:3300/api/zoos/
// POST 
router.post('/', (req, res) => {
    db('zoos')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      db('zoos')
      .where({ id })
      .first()
      .then(zoos => {
       res.status(201).json(zoos);
      })
      .catch(error => {
        res.status(500).json(error);
      });
      
    })
});

// localhost:3300/api/zoos/:id
// PUT 
router.put('/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if(count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'Not found'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// localhost:3300/api/zoos/:id
// DELETE 
router.delete('/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Not found'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;