import { Database } from './db-postgres';
import { PRServer } from './server';

const theDatabase = new Database();
const theServer = new PRServer(theDatabase);

theServer.listen(process.env.PORT);
