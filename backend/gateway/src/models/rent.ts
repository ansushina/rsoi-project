export class Rent {

  id?: number;
   
  uid: string;

  user_uid: string;

  payment_uid: string;

  scooter_uid: number;

  status: string;

  start_date: string;
  
  end_data: string;
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