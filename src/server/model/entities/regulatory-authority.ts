import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RegulatedProfession } from "./regulated-profession";

@Entity("regulatory_authority")
export class RegulatoryAuthority {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: true, length: 200 })
    name: string;

    @Column('varchar', { nullable: true, length: 50 })
    acroymn: string;

    @Column('int', { nullable: true })
    noOfRD: number;

    @Column('varchar', { nullable: true, length: 200 })
    street: string;

    @Column('varchar', { nullable: true, length: 200 })
    city: string;

    @Column('varchar', { nullable: true, length: 10 })
    postCode: string;

    @Column('varchar', { nullable: true, length: 100 })
    nation: string;

    @OneToMany(type => RegulatedProfession, regulatedProfession => regulatedProfession.regulatoryAuthority)
    regulatedProfessions: RegulatedProfession[];

    @Column('varchar', { nullable: true, length: 100 })
    phoneNumber: string;

    @Column('varchar', { nullable: true, length: 1000 })
    website: string;

    @Column('varchar', { nullable: true, length: 100 })
    emailAddress: string;
}