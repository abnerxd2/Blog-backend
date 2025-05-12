import { Router } from "express";
import { addSubjects,listSubjects,filterSubjects, getSubjectById } from "./subjects.controller.js";

const router = Router();

router.post("/:add", addSubjects);
router.get("/", listSubjects);
router.get("/filter/:dato", filterSubjects);
router.get("/:id", getSubjectById)

export default router;
