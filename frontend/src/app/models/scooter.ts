export interface Scooter {

  id?: number;

  name: string;

  uid: string;

  model: string;

  address: string;

  stars: number;

  price: number;

  availability: boolean;
}

// CREATE TABLE scooters
// (
//     id                SERIAL PRIMARY KEY,
//     uid uuid        NOT NULL,
//     name  VARCHAR(80) NOT NULL,
//      model TEXT,
//      adress TEXT,
//      stars REAL,
//     price INT,
//    availability BOOL,
// );
