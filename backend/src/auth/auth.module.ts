import { Module, forwardRef } from '@nestjs/common';

import { UserModule } from '@user/user.module';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { MailService } from '@shared/services/mail.service';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => SharedModule)],
  providers: [AuthService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
