import { Test, TestingModule } from '@nestjs/testing';
import { BeveragesResolver } from './beverages.resolver';
import { BeveragesService } from './beverages.service';

describe('BeveragesResolver', () => {
  let resolver: BeveragesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeveragesResolver, BeveragesService],
    }).compile();

    resolver = module.get<BeveragesResolver>(BeveragesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
