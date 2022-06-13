const app = require("./src/app");
require("././src/db")
const { PORT } = process.env;


app.listen(PORT || 8000, () => {
    console.log('initialized');
});