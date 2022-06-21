const { Schema, model, connect, connection } = require('mongoose');
const chai = require('chai');
const expect = chai.expect;
const validate = require("mongoose-validator");

// Create a new schema that accepts an animal object.
const testSchema = new Schema(
  {
    id_senasa: {
      type: String,
      required: [true, 'Por favor ingrese el ID SENASA'],
      unique: true,
      validate: [
        validate({
          validator: "isLength",
          arguments: [16, 16],
          message: "ID SENASA debe contener 16 characters",
        }),
        validate({
          validator: "isAlphanumeric",
          passIfEmpty: true,
          message: "ID SENASA debe ser un alfanumérico",
        }),
      ],
    },
    type: {
      type: String,
      required: true,
      enum: {values: ["Novillo", "Toro", "Vaquillona"], message: '{VALUE} no es una opción válida'}
    },
    weight: {
      type: Number,
      required: true,
    },
    cattle_ranch: {
      type: String,
      required: true,
      maxlength: 200
    },
    device: {
      type: String,
      required: true,
      enum: {values: ["COLLAR", "CARAVANA"], message: '{VALUE} no es una opción válida'}
    },
    device_number: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validate({
          validator: "isLength",
          arguments: [8, 8],
          message: "Device number should be 8 characters",
        }),
        validate({
          validator: "isAlphanumeric",
          passIfEmpty: true,
          message: "Device number should be alphanumeric",
        }),
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//Create a new collection called 'Animal'
const Animal = model('Animal', testSchema);
describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    connect('mongodb://localhost/testDatabase');
    const db = connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', function() {
    //Save object
    it('New animal saved to test database', function(done) {
      var testName = Animal({
        id_senasa: '154769thj5dsi63e',
        type: 'Novillo',
        weight: 300,
        cattle_ranch: 'Loma alta',
        device: 'COLLAR',
        device_number: '586dfh9e'
      });
 
      testName.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger ('COLLAR' not 'COLAR')
      var wrongSave = Animal({
        id_senasa: 'lsodleoslao3eof4',
        type: 'Novillo',
        weight: 300,
        cattle_ranch: 'Loma baja',
        device: 'COLAR',
        device_number: '5s8e5f96'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Not a valid option for device');
      });
    });
    it('Should retrieve data from test database', function(done) {
      //Look up the id_senasa object previously saved.
      Animal.find({id_senasa: '154769thj5dsi63e'}, (err, id_senasa) => {
        if(err) {throw err;}
        if(id_senasa.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    connection.db.dropDatabase(function(){
    connection.close(done);
    });
  });
});
