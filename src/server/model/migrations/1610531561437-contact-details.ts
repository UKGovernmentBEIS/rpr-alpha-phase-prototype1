import {MigrationInterface, QueryRunner} from "typeorm";

export class contactDetails1610531561437 implements MigrationInterface {
    name = 'contactDetails1610531561437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regulatory_authority" ADD "phoneNumber" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" ADD "website" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" ADD "emailAddress" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regulatory_authority" DROP COLUMN "emailAddress"`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "regulatory_authority" DROP COLUMN "phoneNumber"`);
    }

}
