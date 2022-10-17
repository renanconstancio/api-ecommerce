const {exec} = require('child_process');

try{
  exec('mysqldump --user=root --password=rootpass --result-file=./dbBackup.sql --databases ecommerce_db');
  console.log("Success");
} catch (e) {
  console.log("Error: %O", e);
}
