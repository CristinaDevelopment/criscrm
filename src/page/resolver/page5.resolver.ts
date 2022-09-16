import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GetPage } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { Page2, Page3, Page5, Page6 } from '../entities/page.model';
import { Page6Service, Page5Service } from '../service';

@Resolver(() => Page5)
export class Page5Resolver {
  constructor(
    private readonly page6Service: Page6Service,
    private readonly page5Service: Page5Service,
  ) {}

  @Mutation(() => Page5, { name: 'createPage5' })
  createPage(@Args('input') input: CreatePage) {
    return this.page5Service.createPage(input);
  }

  @Mutation(() => Page5, { name: 'updatePage5' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page5Service.update(id, input);
  }

  @Mutation(() => String, { name: 'deletePage5' })
  delete(@Args() id: GetPage) {
    return this.page5Service.deletePage(id);
  }

  @ResolveField('page', () => [Page6])
  getPage5(@Parent() input: Page6) {
    return this.page6Service.findPage6(input._id);
  }
}
