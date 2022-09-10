import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { Upload } from './entities/upload.entity';
import { CreateUploadInput } from './dto/create-upload.input';
import { UpdateUploadInput } from './dto/update-upload.input';

@Resolver(() => Upload)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => Upload)
  createUpload(@Args('createUploadInput') createUploadInput: CreateUploadInput) {
    return this.uploadService.create(createUploadInput);
  }

  @Query(() => [Upload], { name: 'upload' })
  findAll() {
    return this.uploadService.findAll();
  }

  @Query(() => Upload, { name: 'upload' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.uploadService.findOne(id);
  }

  @Mutation(() => Upload)
  updateUpload(@Args('updateUploadInput') updateUploadInput: UpdateUploadInput) {
    return this.uploadService.update(updateUploadInput.id, updateUploadInput);
  }

  @Mutation(() => Upload)
  removeUpload(@Args('id', { type: () => Int }) id: number) {
    return this.uploadService.remove(id);
  }
}
