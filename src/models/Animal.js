const { Schema, model } = require("mongoose");
const validate = require("mongoose-validator");

const animalSchema = new Schema(
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

const Animal = model('Animal', animalSchema);

module.exports = Animal


// {
//     "id_senasa": "12345678asdfghjk",
//     "type": "Novillo",
//     "weight": 520,
//     "cattle_ranch": "Potrero del Oeste",
//     "device": "COLLAR",
//     "device_number": "1234asdf"
// }