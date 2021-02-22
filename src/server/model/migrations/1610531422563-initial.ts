import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1610531422563 implements MigrationInterface {
    name = 'initial1610531422563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "regulatory_authority" ("id" SERIAL NOT NULL, "name" character varying(200), "acroymn" character varying(50), "noOfRD" integer, "street" character varying(200), "city" character varying(200), "postCode" character varying(10), "nation" character varying(100), CONSTRAINT "PK_15d358d62f51ac3407a564eda23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regulated_profession" ("id" SERIAL NOT NULL, "title" character varying(200), "genericNames" character varying(200), "nationalLegislation" character varying(1000), "legislationLink" character varying(1000), "qualificationLevel" character varying(1000), "regulationDescription" character varying(1000), "reservedActivities" character varying(1000), "obtainQualificationsMethod" character varying(1000), "pathObtainQualifications" character varying(1000), "durationEducation" character varying(1000), "existenceOfMandatoryProfessionalExperience" character varying(1000), "harmonisedTrainingRequiredHere" character varying(1000), "nation" character varying(100), "typeOfRegulation" character varying(100), "additionalInformation" text, "siTypeOfRegulation" character varying(100), "mandatoryTraineeship" boolean, "mandatoryRegistrationInProfessionalBodies" boolean, "territorialRestrictions" boolean, "profIndemnityInsuranceRequirement" boolean, "isActive" boolean, "regulatoryAuthorityId" integer, CONSTRAINT "PK_dbe91b5e67517d8f53a644f181e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD CONSTRAINT "FK_cf5670b09f47ba04ba86e000bc2" FOREIGN KEY ("regulatoryAuthorityId") REFERENCES "regulatory_authority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP CONSTRAINT "FK_cf5670b09f47ba04ba86e000bc2"`);
        await queryRunner.query(`DROP TABLE "regulated_profession"`);
        await queryRunner.query(`DROP TABLE "regulatory_authority"`);
    }

}
