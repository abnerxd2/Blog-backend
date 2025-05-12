import Comments from "../comments/comments.model.js";
import Subjects from "../subjects/subjects.model.js";

export const addComment = async (req, res) => {
    const { data } = req.body; 

    const { contenido, autor, titulo } = data; 

    try {
        // Verificar si el título corresponde a una materia existente en la base de datos
        const materiaExistente = await Subjects.findById(titulo); // Asegúrate de que 'titulo' sea el ID de la materia
        if (!materiaExistente) {
            return res.status(404).json({
                message: "La materia especificada no existe"
            });
        }

        // Crear el nuevo comentario
        const nuevoComentario = new Comments({
            contenido,
            autor,
            titulo
        });

        // Guardar el comentario en la base de datos
        await nuevoComentario.save(); 

        // Retornar una respuesta exitosa con los datos del nuevo comentario
        return res.status(201).json({
            comentario: {
                _id: nuevoComentario._id,
                contenido: nuevoComentario.contenido,
                autor: nuevoComentario.autor,
                titulo: nuevoComentario.titulo,
                fecha: nuevoComentario.fecha
            }
        });

    } catch (error) {
        console.error("Error al agregar comentario: ", error.message);
        return res.status(500).json({
            message: "Error al agregar el comentario",
            error: error.message
        });
    }
};

