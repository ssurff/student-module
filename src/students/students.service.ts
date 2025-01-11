import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { student } from './students.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(student)
        private readonly studentRepository: Repository<student>,
    ){}


    //create
    async createStudent(data: Partial<student>): Promise<student> {
        const student = this.studentRepository.create(data);
        return this.studentRepository.save(student);
    }

    //read
    async getStudents(): Promise<student[]>{
        return this.studentRepository.find();
    }

    async getStudentById(id: number): Promise<student>{
        const student = await this.studentRepository.findOneBy({ id });

        if(!student){
            throw new NotFoundException('Student with ID ${id} not found');
        }

        return student;
    }

    //update 
    async updateStudent(id: number, data: Partial<student>): Promise<student> {
        const student = await this.getStudentById(id);
        Object.assign(student, data);
        return this.studentRepository.save(student);
    }

    //delete
    async deleteStudent(id:number): Promise<void> {
        const result = await this.studentRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException('Student with ID ${id} not found');
        }
    }
}
