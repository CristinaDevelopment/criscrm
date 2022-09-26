import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetSite, GetUser } from './dto/user.args';
import { CreateUser, UpdateUser } from './dto/user.input';
import { User } from './entities/user.model';
import { UserDocument } from './entities/user.schema';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { uuidv3 } from '../utils/index';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(input: CreateUser) {
    // await this.validateCreateUserData(input);
    await this.validateEmailCreate(input);
    const dataDocument = await this.userRepository.create({
      data: {
        role: input.role,
        image: {
          src: input.image,
          alt: input.username,
        },
        username: input.username,
        status: true,
        oAuth: {
          provider: input.oAuth ? input.oAuth : 'credentials',
        },
      },
      updateDate: {
        createdAt: new Date(),
      },
      email: input.email.toLowerCase(),
      password: await bcrypt.hash(input.password, 10),
      site: input.site,
    });
    return this.toModel(dataDocument);
  }

  async update({ id }: GetUser, input: UpdateUser) {
    await this.validateEmailUpdate(id, input);
    const dataDocument = await this.userRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          'data.username': input.username,
          'data.image.src': input.image,
          'data.image.alt': input.username,

          // email: input.email.toLowerCase(),
          // password: await bcrypt.hash(input.password, 10),
        },
        $push: { 'updateDate.register': { updatedAt: new Date() } },
      },
    );
    return this.toModel(dataDocument);
  }

  // async validateCreateUserData(input: CreateUser) {
  //   try {
  //     await this.userRepository.findOne({ email: input.email });
  //     throw new NotFoundException('Email already exists.');
  //   } catch (err) {}
  // }

  async findUserByEmail(email: string) {
    const dataDocument = await this.userRepository.findOne({ email: email });
    return this.toModel(dataDocument);
  }
  async findUser({ id }: GetUser) {
    const dataDocument = await this.userRepository.findOne({ _id: id });
    return this.toModel(dataDocument);
  }

  async deleteUser({ id }: GetUser) {
    await this.userRepository.deleteOne({ _id: id });
    return id;
  }
  async deleteUsers({ siteId }: GetSite) {
    await this.userRepository.deleteMany({ site: siteId });
    return 'users deleted';
  }

  findAll() {
    return this.userRepository.find({});
  }

  private async validateEmailCreate({ email }: CreateUser) {
    await this.userRepository.findOneBySlug({
      email: email,
    });
  }
  private async validateEmailUpdate(id: string, { email }: UpdateUser) {
    await this.userRepository.findOneBySlug({
      _id: { $ne: id },
      email: email,
    });
  }

  async validateUser(email: string, password: string) {
    const userDocument = await this.userRepository.findOne({ email: email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid!.');
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
