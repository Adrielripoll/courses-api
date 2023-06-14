import { UUID } from 'crypto'

export interface Course {
	id: UUID
	title: string
	description: string
	instructor: string
	price: number
	category: Category
}

export type Category = "Programming" | "Design" | "Business"