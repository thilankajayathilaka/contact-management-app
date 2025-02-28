import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(contactData: CreateContactDto): Promise<Contact> {
    const contact = this.contactsRepository.create(contactData);
    return this.contactsRepository.save(contact);
  }
  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactsRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }
  async findAll(): Promise<Contact[]> {
    return this.contactsRepository.find();
  }
  async update(id: number, updateData: UpdateContactDto): Promise<Contact> {
    // Enforce that at least one field is provided for update.
    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided for update.',
      );
    }

    const contact = await this.contactsRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    Object.assign(contact, updateData);
    return this.contactsRepository.save(contact);
  }
  async remove(id: number): Promise<void> {
    const result = await this.contactsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
  }
}
