import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GetSite, GetUser } from './dto/user.args';
import { CreateUser, UpdateUser } from './dto/user.input';
import { UserService } from './user.service';
import { User } from './entities/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('input') input: CreateUser) {
    return this.userService.create(input);
  }

  @Mutation(() => User, { name: 'updateUser' })
  update(@Args() id: GetUser, @Args('input') input: UpdateUser) {
    return this.userService.update(id, input);
  }

  @Mutation(() => String, { name: 'deleteUser' })
  delete(@Args() id: GetUser) {
    return this.userService.deleteUser(id);
  }
  @Mutation(() => String, { name: 'deleteUsers' })
  deletes(@Args() site: GetSite) {
    return this.userService.deleteUsers(site);
  }

  @Query(() => User, { name: 'findUser' })
  async findUser(@Args() id: GetUser) {
    return this.userService.findUser(id);
  }
  
  @Query(() => User, { name: 'findUserByEmail' })
  async findUserByEmail(@Args('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Query(() => [User], { name: 'findUsers' })
  async findUsers() {
    return this.userService.findAll();
  }
}
