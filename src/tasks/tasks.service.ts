import { Injectable } from '@nestjs/common';
import { Task, TaskStaus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(dto: CreateTaskDto): Task {
        const { title, description } = dto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStaus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): Task[]{
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks
    }

    updateTask(updateTaskDto: UpdateTaskDto, body): Task {
        const { id, field } = updateTaskDto;
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        this.tasks[taskIndex][field] = body[field];

        console.log("Data", id, field, this.tasks[taskIndex][field]);

        return this.tasks[taskIndex];
    }
}
