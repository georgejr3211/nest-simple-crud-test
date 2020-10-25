import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'st_username', length: 50, nullable: false, type: 'varchar' })
  username: string;

  @Column({ name: 'st_password', length: 150, nullable: false, type: 'varchar', select: false })
  password: string;

  @Column({ name: 'st_email', length: 100, nullable: false, type: 'varchar' })
  email: string;

  @Column({ name: 'bl_status', nullable: false, default: true, type: 'bool' })
  status?: boolean;

  @CreateDateColumn({ name: 'dt_created' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'dt_updated' })
  updateddAt?: Date;

  @DeleteDateColumn({ name: 'dt_deleted' })
  deletedAt?: Date;

  constructor(data: User) {
    Object.assign(this, data);
  }
}