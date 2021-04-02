import { Injectable } from '@nestjs/common';
import { BaseProduct } from '../domain/BaseProd';
import { IBaseProduct } from '../interfaces/baseprod';
import { IProductPublicDTO } from '../interfaces/product.dto';

@Injectable()
export class ProductMapper {
  toDomain(raw: IBaseProduct): BaseProduct {
    const {
      available,
      createdAt,
      description,
      _id: id,
      guisos,
      maxGuisos,
      minGuisos,
      price,
      title,
    } = raw;
    return new BaseProduct(
      id,
      title,
      description,
      price,
      available,
      maxGuisos,
      minGuisos,
      guisos,
      createdAt,
    );
  }

  toRepo(domain: BaseProduct): IBaseProduct {
    return domain as IBaseProduct;
  }

  // TODO: Use lodash pick
  toDTO(domain: BaseProduct): IProductPublicDTO {
    const mapped: IProductPublicDTO = {
      id: domain._id,
      title: domain.title,
      price: domain.price,
      available: domain.available,
      description: domain.description,
      guisos: domain.guisos,
      maxGuisos: domain.maxGuisos,
      minGuisos: domain.minGuisos,
    };
    return mapped;
  }
}
