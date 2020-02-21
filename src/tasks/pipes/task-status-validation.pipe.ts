import { PipeTransform, BadRequestException} from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{ // hier wil je kijken of de value die je schrijft  1 vd toegelaten values is of niet
    readonly allowedStatuses =[
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    transform(value: any){ // transform is de standaard functie die je moet gebruiken voor pipes
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`)
        }
        return value;
    }

    private isStatusValid(status: any){
        const idx =this.allowedStatuses.indexOf(status); // returns -1 id status is not found in allowedStatuses
        return idx !==-1; // returns true als het niet -1 is
    }
}