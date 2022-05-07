"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const nodemailer_mail_adapter_1 = require("./nodemailer/nodemailer-mail-adapter");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const submit_feedback_service_1 = require("./service/submit-feedback-service");
const express = require('express');
exports.routes = express.Router();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbackService = new submit_feedback_service_1.SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    });
    res.status(201).send();
});
