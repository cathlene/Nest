import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";


    @EntityRepository(Task) // repository is a persistence layer so in the service you dont have to write a lot of logic in order to save a task bijvoorbeeld je kan gwn een functie gebruiken
    // die bestaat in de repository
    export class TaskRepository extends Repository<Task>{

        async createTask(createTaskDto: CreateTaskDto): Promise<Task>{ // custom method
            const {title,description} = createTaskDto;
            const task: Task = new Task(); 
            task.title=title;
            task.description = description;
            task.status = TaskStatus.OPEN;
            await task.save(); // is an async operation because ot might take some time before finishing this operation
            return task
        }

        async getTasks(filterDto: GetTasksFilterDto) : Promise<Task[]>{
            const {status, search} = filterDto;
            const query = this.createQueryBuilder('task'); // vanaf nu ga je in je queries task schrijven als je wilt werken met de querybuilder

            if(status){
                query.andWhere('task.status= :status',{status}); // gebruik andwhere om vorige where niet te overschrijden
            }
            if(search){
                query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{search:`%${search}%`}); // %dit maakt het mogelijk om partial string te zoeken
            }
            const tasks =query.getMany();
            return tasks;
        }
}