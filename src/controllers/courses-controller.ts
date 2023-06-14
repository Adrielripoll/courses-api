import { Request, Response } from 'express'
import { CoursesRepository } from "../repositories/courses"

export class CoursesController {
    static findAll(request: Request, response: Response){
        const coursesList = CoursesRepository.findAll()
        return response.status(200).json(coursesList)
    }

    static findOne(request: Request, response: Response){
        const { id: courseId } = request.params

        const course = CoursesRepository.findById(courseId)

        if(!course){
            return response.status(404).json({ message: 'Course not found'})
        }

        return response.status(200).json(course)
    }
}