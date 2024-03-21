import { IsOptional, IsNumber, Min, Max, IsEmail, IsString, MinLength } from 'class-validator';

export class PomodoroSettingsDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	workInterval?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	breakInterval?: number;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(10)
	intervalsCount?: number;
}

export class UserDto extends PomodoroSettingsDto {
	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password?: string;
}
