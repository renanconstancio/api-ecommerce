import 'reflect-metadata';
import 'dotenv/config';
// import { dataSource } from '../typeorm';
import { app } from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333}`);
});

// dataSource
//   .initialize()
//   .then(() => {
//     const appInit = app.listen(process.env.PORT || 3333, () => {
//       console.log(`Server started on port ${process.env.PORT || 3333}`);
//     });
//   })
//   .catch(err => console.log(`Server is down %O`, err.toString()));
