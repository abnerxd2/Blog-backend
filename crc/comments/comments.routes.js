import { Router } from "express";
import { addComment } from "../comments/comments.controller.js";

const router = Router();

// Agregar un nuevo comentario
router.post("/add/:titulo", addComment);

// Obtener todos los comentarios de una materia por su ID
router.get("/comentarios/:idMateria");

export default router;
