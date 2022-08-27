export class Scooter {

  id?: number;
   
  name: string;

  uid: string;

  model: string;
   
  address: string;
   
  stars: number;
   
  price: number;
}

// CREATE TABLE scooters
// (
//     id                SERIAL PRIMARY KEY,
//     uid uuid        NOT NULL,
//     name  VARCHAR(80) NOT NULL,
//      model TEXT,
//      adress TEXT,
//      stars REAL,
//     price INT
// );