import { SubmitFeedbackService } from "./submit-feedback-services";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: createFeedbackSpy },
            { sendMail: sendMailSpy }
        ) 

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,asdsadasd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without a type', async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: async () => {} },
            { sendMail: async() => {} }
        ) 

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png/base64,asdsadasd'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: async () => {} },
            { sendMail: async() => {} }
        ) 

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png/base64,asdsadasd'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        const submitFeedback = new SubmitFeedbackService(
            { create: async () => {} },
            { sendMail: async() => {} }
        ) 

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    });
});



