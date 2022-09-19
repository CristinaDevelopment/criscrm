import { Injectable } from '@nestjs/common';
import { CreateBeverageInput } from './dto/create-beverage.input';
import { UpdateBeverageInput } from './dto/update-beverage.input';

@Injectable()
export class BeveragesService {
  create(createBeverageInput: CreateBeverageInput) {
    return 'This action adds a new beverage';
  }

  findAll() {
    return `This action returns all beverages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} beverage`;
  }

  update(id: number, updateBeverageInput: UpdateBeverageInput) {
    return `This action updates a #${id} beverage`;
  }

  remove(id: number) {
    return `This action removes a #${id} beverage`;
  }
}
