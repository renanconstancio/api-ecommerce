import 'dotenv/config';
import 'reflect-metadata';
import { app } from './app';

app.listen(process.env.APP_PORT || 3333, () => {
  console.log(`Server started on port ${process.env.APP_PORT || 3333}`);
});
