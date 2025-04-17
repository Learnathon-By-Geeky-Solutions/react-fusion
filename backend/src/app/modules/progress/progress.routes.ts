import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import accessValidation from "../../middlewares/accessValidation";
import { progressController } from "./progress.controller";
import validateRequest from "../../middlewares/validateRequest";
import { progressValidationSchema } from "./progress.validation";

const router = express.Router();

router.post("/video", auth(UserRole.STUDENT), validateRequest(progressValidationSchema.videoUpdateSchema), accessValidation("video"), progressController.updateVideo)

router.post("/quiz", auth(UserRole.STUDENT), validateRequest(progressValidationSchema.quizUpdateSchema), accessValidation("quiz"), progressController.updateQuiz)

router.post("/module", auth(UserRole.STUDENT), validateRequest(progressValidationSchema.moduleUpdateSchema), accessValidation("module"), progressController.updateModule)

router.post("/milestone", auth(UserRole.STUDENT), validateRequest(progressValidationSchema.milestoneUpdateSchema), accessValidation("milestone"), progressController.updateMilestone)

router.post("/course", auth(UserRole.STUDENT), validateRequest(progressValidationSchema.courseUpdateSchema), accessValidation("course"), progressController.updateCourse)

export const progressRoutes = router;
