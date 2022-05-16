import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRespository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-services';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRespository;
    const nodemailerMailAdapter = new NodemailerMailAdapter;
    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository,nodemailerMailAdapter);
  
    await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();
});

