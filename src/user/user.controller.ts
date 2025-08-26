import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from './user.service';
import type { Response } from 'express';
import { newUser } from './dto/newUser.dto';
import { updatedUser } from './dto/updatedUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  async getAllUsers(@Res() response: Response) {
    const allUsers = await this.userService.findAllUsers();
    return response
      .status(200)
      .send({ message: 'Todos os usuários logicamente não deletados (isDeleted=false)', data: allUsers });
  }

  @Get('/:userId')
  async getUserById(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() response: Response,
  ) {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new UnprocessableEntityException(
        'O Usuário com o Id informado não existe',
      );
    }
    return response
      .status(200)
      .send({ message: 'Usuário encontrado com sucesso', data: user });
  }

  @Post('/new')
  async createUser(@Body() userDto: newUser, @Res() response: Response) {
    try {
      const newUser = await this.userService.createUser(userDto);
      return response
        .status(201)
        .send({ message: 'Usuário criado com sucesso', data: newUser });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Patch('/:userId/update')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: updatedUser,
    @Res() response: Response,
  ) {
    try {
      const updateUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      if (!updateUser) {
        throw new UnprocessableEntityException(
          'Ocorreu um erro ao tentar atualizar esse Usuário, por favor tente novamente mais tarde',
        );
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const updatedUser = await this.userService.findUserById(userId);
    return response
      .status(201)
      .send({ message: 'Usuário atualizado com sucesso', data: updatedUser });
  }

  @Delete('/:userId')
  async deleteUserById(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() response: Response,
  ) {
    try {
      const deleteUser = await this.userService.deleteUser(userId);
      if (!deleteUser) {
        throw new UnprocessableEntityException(
          'Ocorreu um erro ao tentar deletar esse Usuário, por favor tente novamente mais tarde',
        );
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const deletedUser = await this.userService.findUserById(userId);
    return response
      .status(201)
      .send({ message: 'Usuário deletado com sucesso', data: deletedUser });
  }
}
