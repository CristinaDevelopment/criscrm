import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GetPageArgs } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { Page1, Page2 } from '../entities/page.model';
import { Page1Service } from '../service/page1.service';
import { Page2Service } from '../service/page2.service';

@Resolver(() => Page1)
export class Page1Resolver {
  constructor(
    private readonly page1Service: Page1Service,
    private readonly page2Service: Page2Service,
  ) {}

  @Mutation(() => Page1, { name: 'createPage1' })
  create(@Args('input') input: CreatePage) {
    return this.page1Service.createPage(input);
  }

  @Mutation(() => Page1, { name: 'updatePage1' })
  update(@Args() id: GetPageArgs, @Args('input') input: UpdatePage) {
    return this.page1Service.update(id, input);
  }
  @Mutation(() => String, { name: 'deletePage1' })
  delete(@Args() id: GetPageArgs) {
    return this.page1Service.deletePage(id);
  }

  @Query(() => [Page1], { name: 'getPages1' })
  getPages() {
    return this.page1Service.getPages();
  }


  @ResolveField('page', () => [Page2])
  getPage1(@Parent() input: Page2) {
    return this.page2Service.findPage2(input._id);
  }

}
