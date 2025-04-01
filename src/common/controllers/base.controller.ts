import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { IBaseEntity } from '../interfaces/base.entity.interface';
import { DeepPartial } from 'typeorm';
import { plainToClass } from 'class-transformer';

export abstract class BaseController<T extends IBaseEntity, ResponseDto = T> {
  constructor(
    protected readonly service: BaseService<T>,
    private readonly responseDto?: new () => ResponseDto,
  ) {}

  protected transformToDto(data: T | null): ResponseDto | null {
    if (!data || !this.responseDto) return data as unknown as ResponseDto;
    return plainToClass(this.responseDto, data);
  }

  protected transformToDtoArray(data: T[]): ResponseDto[] {
    if (!this.responseDto) return data as unknown as ResponseDto[];
    return data.map(item => plainToClass(this.responseDto!, item));
  }

  @Get()
  async findAll(): Promise<ResponseDto[]> {
    const items = await this.service.findAll();
    return this.transformToDtoArray(items);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto | null> {
    const item = await this.service.findOne(id);
    return this.transformToDto(item);
  }

  @Post()
  async create(@Body() data: DeepPartial<T>): Promise<ResponseDto> {
    const created = await this.service.create(data);
    return this.transformToDto(created) as ResponseDto;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: DeepPartial<T>): Promise<ResponseDto | null> {
    const updated = await this.service.update(id, data);
    return this.transformToDto(updated);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
} 