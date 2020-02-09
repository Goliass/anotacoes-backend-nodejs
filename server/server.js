const app = require('./config/custom-express');
const CustomDate = require('./utils/CustomDate');

let port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port} - ${CustomDate.timezonedTime()}`);
});