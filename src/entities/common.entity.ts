import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class CommonBigPKEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @CreateDateColumn ({ type: 'timestamp'})
    createdAt: Date;

    @CreateDateColumn ({ type: 'timestamp', nullable: true})
    updatedAt: Date | null;

    @CreateDateColumn ({ type: 'timestamp', nullable: true})
    deletedAt: Date | null;
}