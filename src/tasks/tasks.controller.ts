import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    createTask(@Body() dto: CreateTaskDto): Task {
        return this.taskService.createTask(dto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id/:status')
    updateTask(@Param() dto: UpdateTaskDto, @Body() body) {
        return this.taskService.updateTask(dto, body);
    }
}

