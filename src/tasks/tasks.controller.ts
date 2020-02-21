import { Controller, Get, Post, Body, Param, Delete, Patch, ValidationPipe, UsePipes, Query, ParseIntPipe, UseGuards} from '@nestjs/common';
import {TasksService} from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard()) // authentication middleware, als je nu naar /tasks gaat zonder token in je header zal het niet worden toegelaten
export class TasksController {

    constructor(private tasksService: TasksService){  // with name private it will already create a private property in this class so any other method can aaccess tasksService
    }


    @Get() // now js knows when there is an incoming get request to trigger this function
    //we pakken nu de de gegevens uit queryParamters en slaan het op in filterDto
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto):Promise<Task[]>{ // Met deze filter kan je nu in url schrijven : tasks?status=OPEn&search=hello, the entire query will be parsed to an object
        return this.tasksService.getTasks(filterDto);
        }
    

    
     @Get('/:id') // now js knows when there is an incoming get request to trigger this function
    getTaskById(@Param('id',ParseIntPipe) id:number): Promise<Task>{ // pipe is build in functie in js, parses the id into an int => int = number indien het geen int is gaat die automatisch een error throwen
        return this.tasksService.getTaskByID(id); // return this back to the client
    }

    // 2 manieren om gegevens uit body te halen
    /*@Post()
    createTaks(@Body() body){
        console.log(body);
    }
    */
   

    @Post()
    @UsePipes(ValidationPipe) // validationPipe om aan te geven dat je in je Dto gebruik maakt van validations @
    createTaks(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
       return this.tasksService.createTask(createTaskDto);
    }

    
    @Delete('/:id')
    deleteTaks(@Param('id',ParseIntPipe) id:number): Promise<void>{
        return this.tasksService.deleteTask(id);
    }
    
    @Patch('/:id/status')
    updateStatus(  @Param('id', ParseIntPipe)id: number,
                   @Body('status',TaskStatusValidationPipe) status: TaskStatus) : Promise<Task>{ // om uw pipe toe te voegen aan uw status zet het erachter
     return this.tasksService.updateTaskStatus(id,status);
    }

}