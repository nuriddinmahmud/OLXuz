import { PartialType } from '@nestjs/swagger';
import { CreateElonDto } from './create-elon.dto';

export class UpdateElonDto extends PartialType(CreateElonDto) {}
