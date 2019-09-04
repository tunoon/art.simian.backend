import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';
import { AddressEntity } from './address.entity';
import { UserEntity } from '../user/user.entity';
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async getAddressList(user: UserEntity) {
    const { id: userId } = user;
    const addressList = await this.addressRepository.find({
      userId
    });
    return addressList;
  }

  async getAddress(id: string) {
    const address = await this.addressRepository.findOne({ id });
    if (!address) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return address;
  }

  async createAddress(user: UserEntity, body: AddressDto) {
    const { id: userId } = user;
    const address = await this.addressRepository.create({ ...body, userId });
    await this.addressRepository.save(address);
    return address;
  }

  async updateAddress(id: string, body: Partial<AddressDto>) {
    const address = await this.addressRepository.findOne({ id });
    if (!address) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.addressRepository.update({ id }, body);
    return address;
  }

  async deleteAddress(id: string) {
    const address = await this.addressRepository.findOne({ id });
    if (!address) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.addressRepository.delete({ id });
    return address;
  }
}
