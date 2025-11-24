import mongoose from "mongoose";

const netflixSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "El título de la producción es obligatorio"]
  },
  genero: {
    type: String,
    required: [true, "El género es obligatorio"]
  },
  año: {
    type: Number,
    required: [true, "El año de lanzamiento es obligatorio"]
  },
  tipo: {
    type: String,
    required: [true, "El tipo es obligatorio"]
  },
  duracion: {
    type: String,
    required: false
  },
  clasificacion: {
    type: String,
    required: false
  },
  descripcion: {
    type: String,
    required: false
  },
  idioma: {
    type: String,
    default: "Español"
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  },
    imagen: {          
    type: String,
    required: false
  }
  
});

const Netflix = mongoose.model("Netflix", netflixSchema);

export default Netflix;