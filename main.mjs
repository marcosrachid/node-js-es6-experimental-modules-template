"use strict";
import app from './config/server';
import { db, objectID } from './config/dbConnection';

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const port = 9000;
app.listen(port);

console.log('Servidor HTTP escutando na porta ' + port);

app.get('/api', (req, res) => {
  db.open((err, mongoclient) => {
    mongoclient.collection('col', (err, collection) => {
      collection.find().toArray((err, results) => {
        if(err){
          res.statusCode(500).send(err);
        } else {
          res.status(200).json(results);
        }
        mongoclient.close();
      });
    });
  });
});
app.get('/api/:id', (req, res) => {
  db.open((err, mongoclient) => {
    mongoclient.collection('col', (err, collection) => {
      collection.find(objectID(req.params.id)).toArray((err, results) => {
        if(err){
          res.statusCode(500).send(err);
        } else {
          res.status(200).json(results);
        }
        mongoclient.close();
      });
    });
  });
});
app.post('/api', (req, res) => {
  let dados = req.body;
  db.open((err, mongoclient) => {
    mongoclient.collection('col', (err, collection) => {
      collection.insert(dados, (err, records) => {
        if(err){
          res.statusCode(500).send(err);
        } else {
          res.status(201).send("");
        }
        mongoclient.close();
      });
    });
  });
});
app.put('/api/:id', (req, res) => {
  let dados = req.body;
  db.open((err, mongoclient) => {
    mongoclient.collection('col', (err, collection) => {
      collection.update(
        { _id : objectID(req.params.id) },
        { $set: dados },
        {},
        (err, record) => {
          if(err){
            res.statusCode(500).send(err);
          } else {
            res.status(202).send("");
          }
          mongoclient.close();
        }
      );
    });
  });
});
app.delete('/api/:id', (req, res) => {
  db.open((err, mongoclient) => {
    mongoclient.collection('col', (err, collection) => {
      collection.remove(
        { _id : objectID(req.params.id) },
        (err, record) => {
          if(err){
            res.statusCode(500).send(err);
          } else {
            res.status(202).send("");
          }
          mongoclient.close();
        }
      );
    });
  });
});
