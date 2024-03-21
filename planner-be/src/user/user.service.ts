import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				tasks: true,
			},
		});
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}

	async getByProfile(id: string) {
		const profile = await this.getById(id);

		if (!profile) {
			return null;
		}

		const totalTasks = profile.tasks.length;
		const completedTasks = profile.tasks.filter(task => task.isCompleted).length;
		const todayStart = startOfDay(new Date());
		const weekStart = startOfDay(subDays(new Date(), 7));
		const todayTasks = profile.tasks.filter(task => task.createdAt >= todayStart);
		const weekTasks = profile.tasks.filter(task => task.createdAt >= weekStart);

		const { password, ...user } = profile;
		return {
			user,
			statistics: [
				{ label: 'Total', value: totalTasks },
				{ label: 'Completed tasks', value: completedTasks },
				{ label: 'Today tasks', value: todayTasks.length },
				{ label: 'Week tasks', value: weekTasks.length },
			],
		};
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password),
		};

		return this.prisma.user.create({
			data: user,
		});
	}

	async update(id: string, dto: UserDto) {
		let data = dto;

		if (dto.password) {
			data = {
				...data,
				password: await hash(dto.password),
			};
		}

		return this.prisma.user.update({
			where: { id },
			data,
			select: {
				id: true,
				email: true,
				name: true,
				tasks: true,
			},
		});
	}
}
