import { IsNotEmpty } from 'class-validator';
// import { ApiModelProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  // @ApiModelProperty({
  //   example: 'https://xxx.xxx',
  //   description: 'The path of the UploadResponse',
  // })
  @IsNotEmpty()
  readonly url: string
}
