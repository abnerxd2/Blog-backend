import Subjects from "../subjects/subjects.model.js";




export const addSubjects = async (req, res) => {
    const { titulo, descripcion, materia } = req.body;
    try {
        const nuevaMateria = new Subjects({
            titulo,
            descripcion,
            materia
        });
        await nuevaMateria.save();
        return res.status(201).json({
            message: "materia agregada exitosamente",
            materia: nuevaMateria
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al agregar materia",
            error: error.message
        });
    }
};



export const listSubjects = async (req, res) => {
    try {

        const subjects = await Subjects.find().populate("materia");
        return res.status(200).json({
            message: "Materias listadas exitosamente",
            subjects
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al listar las materias",
            error: error.message
        });
    }
};





export const filterSubjects = async (req, res) => {
    const { dato } = req.params;

    try {
        let materias = [];

        if (!dato) {
            return res.status(400).json({ message: "Debe enviar un dato para filtrar" });
        }

        if (dato.toLowerCase() === "fecha") {
          
            materias = await Subjects.find().sort({ createdAt: -1 });
        } else {
         
            materias = await Subjects.find({
                materia: new RegExp(dato, "i")
            });
        }

        if (materias.length === 0) {
            return res.status(404).json({
                message: `No se encontraron materias con el criterio: ${dato}`
            });
        }

        return res.status(200).json({
            message: "Materias encontradas",
            materias
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al filtrar materias",
            error: error.message
        });
    }
};

export const getSubjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const subject = await Subjects.findById(id);

        if (!subject) {
            return res.status(404).json({
                message: "Materia no encontrada con el ID proporcionado"
            });
        }

        return res.status(200).json({
            message: "Materia encontrada",
            subject
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la materia",
            error: error.message
        });
    }
};

