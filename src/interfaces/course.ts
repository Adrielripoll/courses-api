import { UUID } from 'crypto'

export interface Curso {
	id: UUID
	titulo: string
	descricao: string
	instrutor: string
	categoria: Categoria
}

export type Categoria = "Programação" | "Design" | "Negócios"