import { MailAdapter } from "../adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService{
    constructor(
       private feedbacksRepository: FeedbacksRepository,
       private mailAdapter: MailAdapter,
    ) {}

    async execute(request : SubmitFeedbackServiceRequest){     
        const { type, comment, screenshot } = request;

        if ( !type ){
            throw new Error('Type is required.');
        }

        if ( !comment ){
            throw new Error('Comment is required.');
        }
        // data:image/png;base64
        if (screenshot && !screenshot.startsWith('data:image/png;base64')){
            // console.log(screenshot);
            throw new Error('Invalid screenshot format.')


        }

        await this.feedbacksRepository.create({
                type,
                comment,
                screenshot,
            })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback recebido',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` :null,
                
                `</div>`
            ].join('\n'),
        })
        }        
    };
