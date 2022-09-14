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
import { Page2, Page3, Page4 } from '../entities/page.model';
import { Page4Service, Page3Service } from '../service';

@Resolver(() => Page3)
export class Page3Resolver {
  constructor(
    private readonly page3Service: Page3Service, 
    private readonly page4Service: Page4Service,
  ) {}

  @Mutation(() => Page3, { name: 'createPage3' })
  createPage(@Args('input') input: CreatePage) {
    return this.page3Service.createPage(input);
  }

  @Mutation(() => Page3, { name: 'updatePage3' })
  update(@Args() id: GetPageArgs, @Args('input') input: UpdatePage) {
    return this.page3Service.update(id, input);
  }

  @Mutation(() => String, { name: 'deletePage3' })
  delete(@Args() id: GetPageArgs) {
    return this.page3Service.deletePage(id);
  }

  @ResolveField('page', () => [Page4])
  getPage4(@Parent() input: Page4) {
    return this.page4Service.findPage4(input._id);
  }



}
