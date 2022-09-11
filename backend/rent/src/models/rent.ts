import { randomUUID } from "crypto";

export class Rent {

  id?: number;
   
  uid: string;

  user_uid: string;

  payment_uid?: string;

  scooter_uid: string;

  status: string;

  start_date: string;
  
  end_data?: string;
}

// CREATE TABLE rent
// (
//     id                SERIAL PRIMARY KEY,
//     uid uuid        NOT NULL,


// user_uid uuid,
// payment_uid uuid,
// scooter_uid uuid,
// status TEXT,
// start_date timestamp, 
// end_data timestamp
// );