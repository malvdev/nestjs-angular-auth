import { Module, forwardRef } from '@nestjs/common';

import { UserModule } from '@user/user.module';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => SharedModule)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
