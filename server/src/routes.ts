import { NodemailerMailAdapter } from './nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './service/submit-feedback-service';
const express = require('express')

export const routes = express.Router();

routes.post('/feedbacks', async (req: any, res: any) => {
  const { type, comment, screenshot } = req.body;
  
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot
  });

  res.status(201).send();
})