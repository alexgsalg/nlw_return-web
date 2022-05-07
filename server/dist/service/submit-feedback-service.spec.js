"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_service_1 = require("./submit-feedback-service");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedback_service_1.SubmitFeedbackService({ create: createFeedbackSpy }, 
// { create: async () => {} },
{ sendMail: sendMailSpy }
// { sendMail: async () => {} }
);
describe('Submir feedback', () => {
    it('Should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('Should not be able to submit a feedback without a type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64',
        })).rejects.toThrow();
    });
    it('Should not be able to submit a feedback without a comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
    it('Should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
});
