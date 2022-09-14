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
import { Page2, Page3, Page4, Page5 } from '../entities/page.model';
import { Page4Service, Page5Service } from '../service';

@Resolver(() => Page4)
export class Page4Resolver {
  constructor(
    private readonly page4Service: Page4Service,
    private readonly page5Service: Page5Service,
    ) 
  {}

  @Mutation(() => Page4, { name: 'createPage4' })
  createPage(@Args('input') input: CreatePage) {
    return this.page4Service.createPage(input);
  }

  @Mutation(() => Page4, { name: 'updatePage4' })
  update(@Args() id: GetPageArgs, @Args('input') input: UpdatePage) {
    return this.page4Service.update(id, input);
  }

  @Mutation(() => String, { name: 'deletePage4' })
  delete(@Args() id: GetPageArgs) {
    return this.page4Service.deletePage(id);
  }

  @ResolveField('page', () => [Page5])
  getPage5(@Parent() input: Page5) {
    return this.page5Service.findPage5(input._id);
  }
}
