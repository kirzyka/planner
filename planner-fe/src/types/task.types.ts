import { IBase } from './root.types'

export enum EnumTaskPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ITaskResponse extends IBase {
	name: string
	isCompleted: boolean
	priority?: EnumTaskPriority
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
