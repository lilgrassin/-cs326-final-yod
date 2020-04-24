import { Database } from './db-mongo';
import { PRServer } from './server';

const theDatabase = new Database('pantryraiders');
const theServer = new PRServer(theDatabase);

theServer.listen(8080);
