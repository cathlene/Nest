import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports:[
    TypeOrmModule.forFeature([TaskRepository]), // now we can consume this in the service
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService] // services are providers in nest
})
export class TasksModule {}
