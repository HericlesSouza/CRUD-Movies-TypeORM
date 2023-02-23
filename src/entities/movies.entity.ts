import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movies {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ length: 50, unique: true })
        name: string;

    @Column({ type: "text", nullable: true })
        description: string;

    @Column({ type: "integer" })
        duration: number;

    @Column({ type: "integer" })
        price: number;
}