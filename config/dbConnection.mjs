"use strict";
import mongodb from 'mongodb';

const objectID = mongodb.ObjectId;

const db = mongodb.Db(
  'api',
  new mongodb.Server('localhost', 27017, {}),

);

export { db, objectID };
