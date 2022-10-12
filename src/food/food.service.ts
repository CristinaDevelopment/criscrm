import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { UpdateImage } from 'src/product/dto/product.input';
import { CreateFood, GetFoodArgs, GetSite, UpdateFood } from './dto';
import { FoodDocument } from './entities/food.schema';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async create(input: CreateFood, type: string) {
    let data;
    switch (type) {
      case 'food':
        data = await this.foodRepository.add(input, type);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }
  async update({ id }: GetFoodArgs, input: UpdateFood, type: string) {
    let data;
    switch (type) {
      case 'food':
        data = await this.foodRepository.update(id, input);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }

  async updateImage(
    { id }: GetFoodArgs,
    input: UpdateImage[],
    type: string,
    uid: string,
  ) {
    let data;
    switch (type) {
      case 'food':
        data = await this.foodRepository.updateImage(id, input, uid);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }
  async findFood({ id }: GetFoodArgs, type: string) {
    let data;
    switch (type) {
      case 'food':
        data = await this.foodRepository.findOne({ _id: id });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return this.toModel(data);
  }

  findFoods(type: string) {
    let data;
    switch (type) {
      case 'food':
        data = this.foodRepository.find({});
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findAllFoods() {
    const foods = await this.foodRepository.find({});

    return [...foods];
  }

  async findFoodsBySite({ siteId }: GetSite, type: string) {
    let data;
    switch (type) {
      case 'food':
        data = await this.foodRepository.find({ site: siteId });
        break;
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findFoodsByParent(parentId: string, type: string) {
    let data;
    switch (type) {
      case 'food':
        data = await this.foodRepository.find({ parent: parentId });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  async findAllFoodsByParent(parentId: string) {
    const foods = await this.foodRepository.find({
      parent: parentId,
    });

    return [...foods];
  }

  async deleteFood({ id }: GetFoodArgs, type: string) {
    switch (type) {
      case 'food':
        await this.foodRepository.deleteOne({ _id: id });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return id;
  }

  async deleteFoods({ siteId }: GetSite, type: string) {
    switch (type) {
      case 'food':
        await this.foodRepository.deleteMany({ site: siteId });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return 'deleted products';
  }
  async deleteFoodsById(ids: string[], type: string) {
    switch (type) {
      case 'food':
        await this.foodRepository.deleteManyFoods(ids);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    return ids;
  }

  findByParentId(parentUi: string, type: string) {
    let data;
    switch (type) {
      case 'food':
        data = this.foodRepository.find({ parent: parentUi });
        break;
      default:
        data = [];
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }

  findByParentClothing(pageUi) {
    return this.foodRepository.find({ parent: pageUi });
  }

  findBySiteId(siteId: string, type: string) {
    let data;
    switch (type) {
      case 'food':
        data = this.foodRepository.find({ site: siteId });
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }

    return data;
  }

  all(pagination: ListInput, type: string, siteId: string) {
    let data;
    switch (type) {
      case 'food':
        data = this.foodRepository.All(pagination, siteId);
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
        break;
    }
    if (!data) {
      throw new UnprocessableEntityException(`there is no "${type}" category`);
    }
    return data;
  }
  private toModel(foodDocument: FoodDocument) {
    return {
      _id: foodDocument._id.toHexString(),
      data: foodDocument.data,
      site: foodDocument.site,
      parent: foodDocument.parent,
      type: foodDocument.type,
      updateDate: foodDocument.updateDate,
    };
  }
}
