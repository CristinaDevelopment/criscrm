import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GetSiteArgs, GetUserArgs } from './dto/user.args';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { UserService } from './user.service';
import { User } from './entities/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args() id: GetUserArgs, @Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  deleteUser(@Args() id: GetUserArgs) {
    return this.userService.deleteUser(id);
  }
  @Mutation(() => String, { name: 'deleteUsers' })
  deleteUsers(@Args() site: GetSiteArgs) {
    return this.userService.deleteUsers(site);
  }

  @Query(() => User, { name: 'getUser' })
  async getUser(@Args() id: GetUserArgs) {
    return this.userService.getUser(id);
  }
  @Query(() => User, { name: 'getUserByEmail' })
  async getUserByEmail(@Args('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Query(() => [User], { name: 'getUsers' })
  async getUsers() {
    return this.userService.findAll();
  }
}
