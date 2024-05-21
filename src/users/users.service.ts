import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(take?: number, skip?: number): Promise<User[]> {
    return this.prisma.user.findMany({
      take,
      skip,
    });
  }

  async getUser(
    where: Prisma.UserWhereUniqueInput,
    withJokes?: boolean,
  ): Promise<User> {
    return this.prisma.user.findUnique({
      where,
      include: { jokes: withJokes },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await this.hashPassword(data.password);
    return this.prisma.user.create({ data });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
