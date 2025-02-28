import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name); // Add logger

  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(contactData: CreateContactDto): Promise<Contact> {
    this.logger.log(`Creating new contact: ${JSON.stringify(contactData)}`);
    const contact = this.contactsRepository.create(contactData);
    const savedContact = await this.contactsRepository.save(contact);
    this.logger.log(
      `Contact created successfully: ${JSON.stringify(savedContact)}`,
    );
    return savedContact;
  }

  async findOne(id: number): Promise<Contact> {
    this.logger.log(`Fetching contact with ID: ${id}`);
    const contact = await this.contactsRepository.findOne({ where: { id } });
    if (!contact) {
      this.logger.warn(`Contact with ID ${id} not found`);
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    this.logger.log(`Found contact: ${JSON.stringify(contact)}`);
    return contact;
  }

  async findAll(): Promise<Contact[]> {
    this.logger.log(`Fetching all contacts`);
    const contacts = await this.contactsRepository.find();
    this.logger.log(`Fetched ${contacts.length} contacts`);
    return contacts;
  }

  async update(id: number, updateData: UpdateContactDto): Promise<Contact> {
    this.logger.log(`Updating contact with ID: ${id}`);
    this.logger.debug(`Update data: ${JSON.stringify(updateData)}`);

    if (Object.keys(updateData).length === 0) {
      this.logger.warn(`Update request for ID ${id} contains no valid fields`);
      throw new BadRequestException(
        'At least one field must be provided for update.',
      );
    }

    const contact = await this.contactsRepository.findOne({ where: { id } });
    if (!contact) {
      this.logger.warn(`Contact with ID ${id} not found`);
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    Object.assign(contact, updateData);
    const updatedContact = await this.contactsRepository.save(contact);
    this.logger.log(`Contact with ID ${id} updated successfully`);
    return updatedContact;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Deleting contact with ID: ${id}`);
    const result = await this.contactsRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Contact with ID ${id} not found`);
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    this.logger.log(`Contact with ID ${id} deleted successfully`);
  }
}
