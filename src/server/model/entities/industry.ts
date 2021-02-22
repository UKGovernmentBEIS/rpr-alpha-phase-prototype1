import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RegulatedProfession } from "./regulated-profession";

@Entity("industry")
export class Industry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: true, length: 200 })
    name: string;

    @OneToMany(type => RegulatedProfession, regulatedProfession => regulatedProfession.industry)
    regulatedProfessions: RegulatedProfession[];
}