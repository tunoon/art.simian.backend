import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';
import { AddressEntity } from './address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>
  ) {}

  async createAddress(body: AddressDto) {
    const address = await this.addressRepository.create(body);
    await this.addressRepository.save(address);
    return address;
  }
}
