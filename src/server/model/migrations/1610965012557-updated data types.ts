import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedDataTypes1610965012557 implements MigrationInterface {
    name = 'updatedDataTypes1610965012557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regulatory_authority" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" ADD "website" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "title" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "genericNames"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "genericNames" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "nationalLegislation"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "nationalLegislation" text`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "reservedActivities"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "reservedActivities" text`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "typeOfRegulation"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "typeOfRegulation" text`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "siTypeOfRegulation"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "siTypeOfRegulation" text`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "regulationDescription"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "regulationDescription" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "siTypeOfRegulation"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "siTypeOfRegulation" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "typeOfRegulation"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "typeOfRegulation" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "reservedActivities"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "reservedActivities" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "nationalLegislation"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "nationalLegislation" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "genericNames"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "genericNames" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "title" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" ADD "website" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" DROP COLUMN "regulationDescription"`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" ADD "regulationDescription" character varying(1000)`);
    }

}
