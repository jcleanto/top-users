import { Inject, Injectable } from '@nestjs/common';
import objection from 'objection';
import { UserModel } from 'src/db/models/User.model';
import { UserInterface } from './interface/user.interface';
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
}
