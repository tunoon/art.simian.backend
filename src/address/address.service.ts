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

  private ensureOwnership(address: AddressEntity, user: UserEntity) {
    const { id: userId } = user;
    if (address.user.id !== userId) {
      throw new HttpException('Authentication failed', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAddressList(user: UserEntity) {
    const { id } = user;
    const addressList = await this.addressRepository.find({
      relations: ['user']
    });
    return addressList.filter(address => address.user.id === id);
  }

  async getAddress(id: string) {
    const address = await this.addressRepository.findOne({ id });
    if (!address) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return address;
  }

  async createAddress(user: UserEntity, body: AddressDto) {
    const address = await this.addressRepository.create({ ...body, user });
    await this.addressRepository.save(address);
    return address;
  }

  async updateAddress(user: UserEntity, id: string, body: Partial<AddressDto>) {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!address) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(address, user);
    await this.addressRepository.update({ id }, body);
    return { ...address, ...body };
  }

  async deleteAddress(user: UserEntity, id: string) {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!address) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(address, user);
    await this.addressRepository.delete({ id });
    return address;
  }
}
