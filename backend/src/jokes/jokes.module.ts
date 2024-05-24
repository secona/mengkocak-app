import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [JokesService],
  controllers: [JokesController],
})
export class JokesModule {}
