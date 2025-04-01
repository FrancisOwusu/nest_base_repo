import { IBaseEntity } from '../interfaces/base.entity.interface';
import { BaseRepository } from '../repositories/base.repository';
import { DeepPartial } from 'typeorm';

export abstract class BaseService<T extends IBaseEntity> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<T | null> {
    return this.repository.findOne(id);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T | null> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async findOneBy(where: any): Promise<T | null> {
    return this.repository.findOneBy(where);
  }
} 