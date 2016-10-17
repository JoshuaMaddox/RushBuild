const fs = require('fs'),
      path = require('path'),
      imageText = path.join(__dirname, '../data/imageText.json'),
      trans = path.join(__dirname, '../data/translations.json'),
      axios = require('axios'),
      squel = require('squel').useFlavour('mysql'),
      connection = require('../config/db'),
      tablename = 'beer';


connection.query(`CREATE TABLE IF NOT EXISTS ${tablename} (
  id VARCHAR(30),
  name VARCHAR(70),
  description VARCHAR(1000),
  rank VARCHAR(30),
  PRIMARY KEY (id)
)`, err => {
  if(err) throw err
})

exports.getRandomBeer = function(cb) {
  let url = `https://api.brewerydb.com/v2/beer/random?key=${process.env.BREWERY_KEY}&format=json`
  axios.get(url)
    .then((res) => {
      cb(null, res.data)
    })
    .catch((err) => {
      cb(err)
    })
}


exports.saveBeer = function(newBeer, cb) {
  exports.create(newBeer)
    // .then(exports.findAll)
    .then(exports.findAll)
    .then(beers => {
      console.log('I am beers in the resolve-------', beers)
      cb(null, beers)
    })
    .catch(err => {
      console.log("err: ", err)
      // res.status(400).send(err)
    })
}


exports.findAll = function() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tablename}`, (err, beers) => {
      if(err) return reject(err)
        console.log('I am the beers from find All!!!!!!!!!!!!!!!!!!!!!!: ', beers)
      resolve(beers)
    })
  })
}

exports.create = function(newBeer) {
  const { id, name, description, rank } = newBeer
  return new Promise((resolve, reject) => {
    let sql = squel.insert()
      .into(tablename)
      .set("name", name)
      .set("id", id)
      .set("description", description)
      .set("rank", rank)
      .toString();

    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

exports.update = function(updatedBeer) {
  console.log('I am an updatedBeer', updatedBeer)
  return new Promise((resolve, reject) => {
    let sql = squel.update()
      .table(tablename)
      .where(`${updatedBeer.id} = id`)
      .setFields(updatedBeer)
      .toString()

      connection.query(sql, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

exports.delete = function(deleteBeer) {
  console.log('I am an id to Delete', deleteBeer)
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
      .from(tablename)
      .where(`${deleteBeer.id}=id`)
      .order("id")
      .toString()

    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
