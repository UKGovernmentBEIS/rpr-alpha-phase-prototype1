import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Industry } from "./industry";
import { RegulatoryAuthority } from "./regulatory-authority";

@Entity("regulated_profession")
export class RegulatedProfession {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: true, length: 500 })
    title: string;

    @Column('varchar', { nullable: true, length: 500 })
    genericNames: string;

    @ManyToOne(type => RegulatoryAuthority, regulatoryAuthority => regulatoryAuthority.regulatedProfessions)
    regulatoryAuthority: RegulatoryAuthority;

    @ManyToOne(type => Industry, industry => industry.regulatedProfessions)
    industry: Industry;

    @Column('text', { nullable: true })
    nationalLegislation: string;

    @Column('varchar', { nullable: true, length: 1000 })
    legislationLink: string;

    @Column('varchar', { nullable: true, length: 1000 })
    qualificationLevel: string;

    @Column('text', { nullable: true })
    regulationDescription: string;

    @Column('text', { nullable: true })
    reservedActivities: string;

    @Column('varchar', { nullable: true, length: 1000 })
    obtainQualificationsMethod: string;

    @Column('varchar', { nullable: true, length: 1000 })
    pathObtainQualifications: string;

    @Column('varchar', { nullable: true, length: 1000 })
    durationEducation: string;

    @Column('varchar', { nullable: true, length: 1000 })
    existenceOfMandatoryProfessionalExperience: string;

    @Column('varchar', { nullable: true, length: 1000 })
    harmonisedTrainingRequiredHere: string;

    @Column('varchar', { nullable: true, length: 100 })
    nation: string;

    @Column('text', { nullable: true })
    typeOfRegulation: string;

    @Column('text', { nullable: true })
    additionalInformation: string;

    @Column('text', { nullable: true })
    siTypeOfRegulation: string;

    @Column('boolean', { nullable: true })
    mandatoryTraineeship: boolean;

    @Column('boolean', { nullable: true })
    mandatoryRegistrationInProfessionalBodies: boolean;

    @Column('boolean', { nullable: true })
    territorialRestrictions: boolean;

    @Column('boolean', { nullable: true })
    profIndemnityInsuranceRequirement: boolean;

    @Column('boolean', { nullable: true })
    isActive: boolean;
}