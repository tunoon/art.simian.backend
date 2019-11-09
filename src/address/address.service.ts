import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AddressEntity } from './address.entity';
import { AddressDto } from './dto/address.dto';
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
    const { id: userId } = user;
    const addressList = await this.addressRepository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
    return addressList.map(({ user, ...rest }) => rest);
  }

  async getAddress(id: string) {
    const address = await this.addressRepository.findOne({ id });
    if (!address) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async createAddress(user: UserEntity, body: AddressDto) {
    const address = this.addressRepository.create({ ...body, user });
    await this.addressRepository.save(address);
    const { user: userInfo, ...rest } = address;
    return rest;
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
