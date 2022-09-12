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
import { Page0, Page1 } from '../entities/page.model';
import { Page0Service } from '../service/page0.service';
import { Page1Service } from '../service/page1.service';

@Resolver(() => Page0)
export class Page0Resolver {
  constructor(
    private readonly page0Service: Page0Service,
    private readonly page1Service: Page1Service,
  ) {}

  @Mutation(() => Page0, { name: 'createPage0' })
  createPage(@Args('input') input: CreatePage) {
    return this.page0Service.createPage(input);
  }

  @Mutation(() => Page0, { name: 'updatePage0' })
  update(@Args() id: GetPageArgs, @Args('input') input: UpdatePage) {
    return this.page0Service.update(id, input);
  }

  @Query(() => [Page0], { name: 'getPages0' })
  getPages() {
    return this.page0Service.getPages0();
  }

  @Mutation(() => String, { name: 'deletePage0' })
  deletePage(@Args() id: GetPageArgs) {
    return this.page0Service.deletePage(id);
  }

  @ResolveField('page', () => [Page1])
  getPage0(@Parent() input: Page1) {
    return this.page1Service.findPage1(input._id);
  }

  @Query(() => [Page0], { name: 'page' })
  findAll() {
    return this.page0Service.findAll();
  }
}
