import { ApiProperty } from '@nestjs/swagger';
import { PageLocale } from '../enities/page-locale.enum';
import { PageType } from '../enities/page-type.enum';

export class PageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  link: string;

  @ApiProperty({ enum: PageType })
  type: PageType;

  @ApiProperty({ enum: PageLocale })
  locale: PageLocale;

  @ApiProperty()
  outerId: string;
}
