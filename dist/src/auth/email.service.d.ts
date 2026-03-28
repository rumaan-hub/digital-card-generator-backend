export declare class EmailService {
    private transporter;
    constructor();
    sendVerificationCode(email: string, code: string): Promise<void>;
}
