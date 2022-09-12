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
import { Page2, Page3 } from '../entities/page.model';
import { Page2Service } from '../service/page2.service';
import { Page3Service } from '../service/page3.service';

@Resolver(() => Page2)
export class Page2Resolver {
  constructor(
    private readonly page2Service: Page2Service,
    private readonly page3Service: Page3Service,
  ) {}

  @Mutation(() => Page2, { name: 'createPage2' })
  createPage(@Args('input') input: CreatePage) {
    return this.page2Service.createPage(input);
  }

  
  @Mutation(() => Page2, { name: 'updatePage2' })
  update(@Args() id: GetPageArgs, @Args('input') input: UpdatePage) {
    return this.page2Service.update(id, input);
  }

  @Mutation(() => String, { name: 'deletePage2' })
  delete(@Args() id: GetPageArgs) {
    return this.page2Service.deletePage(id);
  }

  @ResolveField('page', () => [Page3])
  getPage2(@Parent() input: Page3) {
    return this.page3Service.findPage3(input._id);
  }

  @Query(() => [Page2], { name: 'page' })
  findAll() {
    return this.page2Service.findAll();
  }
}
