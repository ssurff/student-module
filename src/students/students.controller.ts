import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { student } from './students.entity';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentService: StudentsService){}

    @Post()
    async createStudent(@Body() data: Partial<student>): Promise<student> {
        return this.studentService.createStudent(data);
    }

    @Get()
    async getStudent(): Promise<student[]> {
        return this.studentService.getStudents();
    }

    @Get(':id')
    async getStudentById(@Param('id') id: number): Promise<student> {
        return this.studentService.getStudentById(id);
    }

    @Put(':id')
    async updateStudent(
        @Param('id') id: number,
        @Body() data: Partial<student>, 
    ): Promise<student> {
        return this.studentService.updateStudent(id, data);
    }
}
