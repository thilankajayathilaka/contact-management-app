import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int.pipe';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }
  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactsService.update(+id, updateContactDto);
  }
  @Delete(':id')
  async remove(@Param('id', CustomParseIntPipe) id: number): Promise<void> {
    return this.contactsService.remove(id);
  }
}
