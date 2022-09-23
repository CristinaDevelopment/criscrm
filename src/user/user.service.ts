import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetSite, GetUserArgs } from './dto/user.args';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './entities/user.model';
import { UserDocument } from './entities/user.schema';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserInput) {
    await this.validateCreateUserData(input);
    const dataDocument = await this.userRepository.create({
      data: {
        role: input.role,
        image: input.image,
        name: input.name,
        status: true,
        google: false,
      },
      updateDate: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      email: input.email.toLowerCase(),
      password: await bcrypt.hash(input.password, 10),
      site: input.site,
    });
    return this.toModel(dataDocument);
  }

  async validateCreateUserData(input: CreateUserInput) {
    try {
      await this.userRepository.findOne({ email: input.email });
      throw new NotFoundException('Email already exists.');
    } catch (err) {}
  }

  async getUserByEmail(email: string) {
    const dataDocument = await this.userRepository.findOne({ email: email });
    return this.toModel(dataDocument);
  }
  async getUser(id: GetUserArgs) {
    const dataDocument = await this.userRepository.findOne(id);
    return this.toModel(dataDocument);
  }

  async updateUser(id: GetUserArgs, input: UpdateUserInput) {
    const dataDocument = await this.userRepository.findOneAndUpdate(id, {
      $set: {
        'data.name': input.name,
        'data.role': input.role,
        email: input.email.toLowerCase(),
        password: await bcrypt.hash(input.password, 10),
        'updateDate.updatedAt': new Date(),
      },
    });
    return this.toModel(dataDocument);
  }

  async deleteUser(id: GetUserArgs) {
    await this.userRepository.deleteOne(id);
    return id._id;
  }
  async deleteUsers(site: GetSite) {
    await this.userRepository.deleteMany(site);
    return 'users deleted';
  }

  findAll() {
    return this.userRepository.find({});
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return this.toModel(userDocument);
  }

  private toModel(userDocument: UserDocument): User {
    return {
      _id: userDocument._id.toHexString(),
      data: userDocument.data,
      password: userDocument.password,
      email: userDocument.email,
      site: userDocument.site,
      updateDate: userDocument.updateDate,
    };
  }
}
