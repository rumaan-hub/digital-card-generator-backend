import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CardModule],
})
export class AppModule {}
