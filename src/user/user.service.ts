import { Inject, Injectable } from '@nestjs/common';
import objection from 'objection';
import { StatusEnum, UserModel } from '../db/models/User.model';
import { AuthUserInterface, UserInterface } from './interface/user.interface';
import { newUser } from './dto/newUser.dto';
import { updatedUser } from './dto/updatedUser.dto';

@Injectable()
export class UserService {
  constructor(@Inject('UserModel') private UserClass: objection.ModelClass<UserModel>) {}

  // find one User by id
  async findUserById(userId: number): Promise<UserInterface> {
    return await this.UserClass.query().findOne({ id: userId });
  }

  // find all non-deleted Users
  async findAllUsers(): Promise<UserInterface[]> {
    return await this.UserClass.query().where('isDeleted', false);
  }

  // create a new User
  async createUser(newUser: newUser): Promise<UserInterface> {
    const createdUser: UserInterface = await this.UserClass.query().insert(
      newUser,
    );
    return createdUser;
  }

  // update an existent User
  async updateUser(userId: number, updatedUser: updatedUser): Promise<boolean> {
    updatedUser.updatedAt = new Date().toISOString();
    await this.UserClass.query().update(updatedUser).where('id', userId);
    return true;
  }

  // mark an User as deleted
  async deleteUser(userId: number): Promise<boolean> {
    const deletedUser: updatedUser = new updatedUser();
    deletedUser.isDeleted = true;
    deletedUser.deletedAt = new Date().toISOString();
    await this.UserClass.query().update(deletedUser).where('id', userId);
    return true;
  }

  // validate a User for authentication
  async validateUser(email: string, senha: string): Promise<any | undefined> {
    console.log(`[UserService] validateUser, email: ${email}, senha: ${senha}`)
    const user = await this.UserClass.query().findOne({ email, senha, isDeleted: false, status: StatusEnum.ATIVO });

    if (user) {
      console.log('[UserService] validateUser: found user', user)
      return { ...user, senha: undefined }
    }
    return undefined
  }
}
