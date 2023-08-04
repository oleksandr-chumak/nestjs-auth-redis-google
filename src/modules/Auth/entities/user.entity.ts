import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
