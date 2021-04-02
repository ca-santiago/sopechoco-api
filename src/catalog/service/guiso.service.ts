import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { v4 } from 'uuid';
import { Guiso } from '../domain/Guiso';
import { GuisoRepo } from '../repo/guiso.repo';
import { CreateGuisoDTO } from './guiso.dto';

@Injectable()
export class GuisoService {
  constructor(private guisoRepo: GuisoRepo) {}

  async create(dto: CreateGuisoDTO): Promise<void> {
    const instance = new Guiso(
      v4(),
      dto.title,
      dto.description || '',
      dto.available || true,
      moment().format(),
    );
    await this.guisoRepo.save(instance);
    return;
  }

  async getById(id: string) {
    return this.guisoRepo.findByIdToDTO(id);
  }

  async getAll(page = 0) {
    const _page = isNaN(Math.abs(page)) ? page : 0;
    return this.guisoRepo.getAllToDTO(_page);
  }
}
