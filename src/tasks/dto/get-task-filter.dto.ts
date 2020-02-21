import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.OPEN,TaskStatus.IN_PROGRESS,TaskStatus.DONE])
    status: TaskStatus; // this is the data we expect after is has been parsed to an object
    
    @IsOptional()
    @IsNotEmpty()
    search: string;

}