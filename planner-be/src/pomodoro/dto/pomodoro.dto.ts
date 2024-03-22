import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class PomodoroSessionDto {
	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;
}

export class PomodoroRoundnDto {
	@IsNumber()
	totalSeconds: number;

	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean;
}
