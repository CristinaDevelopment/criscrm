import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GetPageArgs } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { Page2, Page3 } from '../entities/page.model';
import { Page3Service } from '../service/page3.service';

@Resolver(() => Page3)
export class Page3Resolver {
  constructor(
    private readonly page3Service: Page3Service, // private readonly page3Service: Page3Service,
  ) {}

  @Mutation(() => Page3, { name: 'createPage3' })
  createPage(@Args('input') input: CreatePage) {
    return this.page3Service.createPage(input);
  }

  @Mutation(() => Page3, { name: 'updatePage3' })
  update(@Args() id: GetPageArgs, @Args('input') input: UpdatePage) {
    return this.page3Service.update(id, input);
  }
  // @ResolveField('page', () => [Page3])
  // getPage3(@Parent() input: Page3) {
  //   return this.page3Service.findPage3(input._id);
  // }

  @Query(() => [Page3], { name: 'page' })
  findAll() {
    return this.page3Service.findAll();
  }
}
