import { Generated, PrimaryColumn } from 'typeorm';

export class BaseWithHiddenPrimaryEntity {
  @PrimaryColumn({ type: 'uuid', select: false })
  @Generated('uuid')
  public id: string;
}
