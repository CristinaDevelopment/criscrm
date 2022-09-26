import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUser, UpdateUser } from './dto/user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { uuidv3 } from 'src/utils';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectModel(User.name, 'usersDB') private userModel: Model<UserDocument>,
  ) {}

  async create(input: CreateUser): Promise<User> {
    return this.userModel.create({
      data: {
        username: input.username,
        role: input.role,
        image: {
          uid: uuidv3(),
          src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1662945416/q8abbnk6ldbdbclpbslk.jpg',
          alt: `image of the ${input.username}`,
        },
        status: true,
        oAuth: [],
      },
      email: input.email.toLowerCase(),
      password: await bcrypt.hash(input.password, 10),
      _id: new Types.ObjectId(),
      updateDate: {
        createdAt: new Date(),
      },
    });
  }
  async update(id: string, input: UpdateUser): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          'data.username': input.username,
          'data.image': {
            uid: uuidv3(),
            src: input.image,
            alt: `image of the ${input.username}`,
          },
        },
        $push: { 'updateDate.register': { updatedAt: new Date() } },
      },
      { lean: true, new: true }
    );
  }
  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById({ _id: id });
  }
  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
