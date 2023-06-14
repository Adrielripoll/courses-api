import { Course } from "../interfaces/course";

export class CoursesRepository {
    static database: Course[] = [
        { 
            id: '2c0c75c6-0a41-11ee-be56-0242ac120002',
            title: "Code programming",
            description: "Code programming course",
            category: 'Programming',
            instructor: 'Jane Doe',
            price: 99.99
        },
        {
            id: '2c0c7864-0a41-11ee-be56-0242ac120002',
            title: 'Web design',
            description:'Web design course',
            category: 'Design',
            instructor: 'John Doe',
            price: 109.99
        },
        {
            id:'2c0c7bde-0a41-11ee-be56-0242ac120002',
            title: 'Executive education',
            description: 'Bussiness course',
            category: 'Business',
            instructor: 'Jane Doe',
            price: 89.99
        }
    ]
    
    static findAll(): Course[] {
        return this.database
    }

    static findById(id: string): Course | undefined {
        const course = this.database.find((course) => course.id == id)
        return course
    }
}