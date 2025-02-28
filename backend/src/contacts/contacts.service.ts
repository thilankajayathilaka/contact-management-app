import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(contactData: CreateContactDto): Promise<Contact> {
    this.logger.log(`Creating new contact: ${JSON.stringify(contactData)}`);
    try {
      // ✅ Check if email already exists
      const existingContact = await this.contactsRepository.findOne({
        where: { email: contactData.email },
      });

      if (existingContact) {
        throw new BadRequestException(
          `A contact with email "${contactData.email}" already exists.`,
        );
      }

      const contact = this.contactsRepository.create(contactData);
      const savedContact = await this.contactsRepository.save(contact);
      this.logger.log(
        `Contact created successfully: ${JSON.stringify(savedContact)}`,
      );
      return savedContact;
    } catch (error) {
      this.logger.error(
        `Failed to create contact: ${error.message}`,
        error.stack,
      );

      // ✅ Preserve the original exception if it's already an HttpException
      if (error instanceof BadRequestException) {
        throw error; // ✅ This ensures 400 is returned instead of 500
      }

      // ✅ Catch unexpected errors & return a 500 error
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the contact.',
      );
    }
  }

  async findOne(id: number): Promise<Contact> {
    this.logger.log(`Fetching contact with ID: ${id}`);
    try {
      const contact = await this.contactsRepository.findOne({ where: { id } });
      if (!contact) {
        this.logger.warn(`Contact with ID ${id} not found`);
        throw new NotFoundException(`Contact with ID ${id} not found`);
      }
      this.logger.log(`Found contact: ${JSON.stringify(contact)}`);
      return contact;
    } catch (error) {
      this.logger.error(
        `Failed to fetch contact: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving the contact.',
      );
    }
  }

  async findAll(): Promise<Contact[]> {
    this.logger.log(`Fetching all contacts`);
    try {
      const contacts = await this.contactsRepository.find();
      this.logger.log(`Fetched ${contacts.length} contacts`);
      return contacts;
    } catch (error) {
      this.logger.error(
        `Failed to fetch contacts: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while retrieving contacts.',
      );
    }
  }

  async update(id: number, updateData: UpdateContactDto): Promise<Contact> {
    this.logger.log(`Updating contact with ID: ${id}`);
    this.logger.debug(`Received update data: ${JSON.stringify(updateData)}`);

    if (Object.keys(updateData).length === 0) {
      this.logger.warn(`Update request for ID ${id} contains no valid fields`);
      throw new BadRequestException(
        'At least one field must be provided for update.',
      );
    }

    try {
      const contact = await this.contactsRepository.findOne({ where: { id } });
      if (!contact) {
        this.logger.warn(`Contact with ID ${id} not found`);
        throw new NotFoundException(`Contact with ID ${id} not found`);
      }

      // Check if the email is unique before updating
      if (updateData.email && updateData.email !== contact.email) {
        const existingContact = await this.contactsRepository.findOne({
          where: { email: updateData.email },
        });

        if (existingContact) {
          throw new BadRequestException(
            `A contact with email "${updateData.email}" already exists.`,
          );
        }
      }

      Object.assign(contact, updateData);
      const updatedContact = await this.contactsRepository.save(contact);
      this.logger.log(`Contact with ID ${id} updated successfully`);
      return updatedContact;
    } catch (error) {
      this.logger.error(
        `Failed to update contact ID ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Deleting contact with ID: ${id}`);
    try {
      const result = await this.contactsRepository.delete(id);
      if (result.affected === 0) {
        this.logger.warn(`Contact with ID ${id} not found`);
        throw new NotFoundException(`Contact with ID ${id} not found`);
      }
      this.logger.log(`Contact with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to delete contact: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'An error occurred while deleting the contact.',
      );
    }
  }
}
