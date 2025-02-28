import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { CustomParseIntPipe } from '../common/pipes/custom-parse-int.pipe';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiCreatedResponse({
    description: 'The contact has been successfully created.',
    type: Contact, // Document the returned model
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all contacts' })
  @ApiResponse({
    status: 200,
    description: 'List of contacts retrieved successfully.',
    type: [Contact],
  })
  async findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single contact by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The contact ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Contact retrieved successfully.',
    type: Contact,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Contact does not exist.',
  })
  async findOne(@Param('id', CustomParseIntPipe) id: number): Promise<Contact> {
    return this.contactsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a contact by ID' })
  @ApiResponse({
    status: 200,
    description: 'The contact has been successfully updated.',
    type: Contact,
  })
  @ApiBadRequestResponse({ description: 'Invalid ID or input data.' })
  @ApiNotFoundResponse({ description: 'Contact not found.' })
  async update(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact by ID' })
  @ApiResponse({
    status: 200,
    description: 'The contact has been successfully deleted.',
  })
  @ApiBadRequestResponse({ description: 'Invalid ID provided.' })
  @ApiNotFoundResponse({ description: 'Contact not found.' })
  async remove(@Param('id', CustomParseIntPipe) id: number): Promise<void> {
    return this.contactsService.remove(id);
  }
}
