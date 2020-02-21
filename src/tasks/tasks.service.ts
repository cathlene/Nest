import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto} from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable() // make service available for injection in other components like controller
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository) // inject repository into service
        private taskrepository: TaskRepository
    ){}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
        return await this.taskrepository.getTasks(filterDto);
    }

    async getTaskByID(id:number): Promise<Task>{
        const found= await this.taskrepository.findOne(id); // findOne returns a promise dus schrijf then of await, findOne is een build in functie van Repository
        if(!found){
                    throw new NotFoundException(`taks with "${id}" not found`); //als je deze niet catch, nest doet dit automatisch voor je en zal een error in json terugegeven
                }
        return found; 
    }

    
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{  
        return this.taskrepository.createTask(createTaskDto);
     
    }

    
    async deleteTask(id:number): Promise<void>{ // delete  functie van repository gaat automatisch een promise returnen
        const result =await this.taskrepository.delete(id);
        if(!result.affected){
            throw new NotFoundException(`taks with "${id}" not found`);
        }
    }
    
    async updateTaskStatus(id:number, status:TaskStatus): Promise<Task>{
       const task = await this.getTaskByID(id);
        task.status = status;
        await task.save();
        return task;
    } 
    
}
