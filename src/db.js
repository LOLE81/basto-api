const { connect } = require("mongoose");

(async() => {
    try {
        const db = await connect("mongodb://localhost/test");
        console.log("DB connected to", db.connection.name);
    } catch(error) {
        console.log(error)
    }
})();
