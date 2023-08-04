import { CreateDateColumn, Generated, PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  public id: string;
  @CreateDateColumn()
  public createdAt: Date;
  @CreateDateColumn()
  public updatedAt: Date;
}
