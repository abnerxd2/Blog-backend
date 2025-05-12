import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    contenido: {
        type: String,
        required: [true, "El contenido del comentario es obligatorio"],
        trim: true
    },
    autor: {
        type: String,
        required: [true, "El nombre del autor es obligatorio"]
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    titulo: {
        type: Schema.Types.ObjectId,
        ref: "Subjects",
        required: [true, "Debe estar asociado a una materia"]
    }
});

export default model("Comments", commentSchema);
