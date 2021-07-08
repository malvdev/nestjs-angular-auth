import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendMailForgotPassword(email: string, password: string): void {}
}
