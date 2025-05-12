import { Schema, model } from "mongoose";

const materiaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, "El nombre de la materia es obligatorio"],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, "La descripción de la materia es obligatoria"]
    },
    materia: {
        type: String,
        required: [true, "El código de la materia es obligatorio"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

export default model("Subjects", materiaSchema);
