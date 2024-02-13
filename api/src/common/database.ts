import { connect } from 'mongoose';
import { executeAsyncWithRetry } from '@utils/async';
import env from '../env';


export default async function createDatabaseConnection() {
  const {
    dbUrl, dbName, dbUser, dbPassword,
  } = env;
  const connectionString = `${dbUrl}/${dbName}`;
  console.log(`mongoose: creating new connection to the database on ${connectionString}`);
  try {
    await executeAsyncWithRetry(async () => {
      await connect(connectionString, {
        user: dbUser,
        pass: dbPassword,
      });

      console.log('mongoose: successful connection to the database');
    });
  } catch (error) {
    console.log('mongoose: connection failure, error ', error);
  }
}