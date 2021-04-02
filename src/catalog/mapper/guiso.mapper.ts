import { Injectable } from '@nestjs/common';
import { Guiso } from '../domain/Guiso';
import { IGuiso } from '../interfaces/guiso';
import { IGuisoAdminDTO, IGuisoPublicDTO } from '../interfaces/guiso.dto';

@Injectable()
export class GuisoMapper {
  toDomain(raw: IGuiso): Guiso {
    const { available, createdAt, description, title, _id: id } = raw;
    return new Guiso(id, title, description, available, createdAt);
  }

  toRepo(domain: Guiso): IGuiso {
    return domain as IGuiso;
  }

  toPublicDTO(domain: Guiso): IGuisoPublicDTO {
    const mapped: IGuisoPublicDTO = {
      id: domain._id,
      title: domain.title,
      description: domain.description,
      available: domain.available,
    };
    return mapped;
  }

  toAdminDTO(domain: Guiso): IGuisoAdminDTO {
    const mapped: IGuisoAdminDTO = {
      id: domain._id,
      title: domain.title,
      description: domain.description,
      available: domain.available,
      createdAt: domain.createdAt,
    };
    return mapped;
  }
}
