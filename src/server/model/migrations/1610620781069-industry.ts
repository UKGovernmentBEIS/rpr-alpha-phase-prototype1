import {MigrationInterface, QueryRunner} from "typeorm";

export class industry1610620781069 implements MigrationInterface {
    name = 'industry1610620781069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "industry" ("id" SERIAL NOT NULL, "name" character varying(200), CONSTRAINT "PK_fc3e38485cff79e9fbba8f13831" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD "industryId" integer`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" ADD CONSTRAINT "FK_0c10f4a652a4e2029b01b07bf10" FOREIGN KEY ("industryId") REFERENCES "industry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP CONSTRAINT "FK_0c10f4a652a4e2029b01b07bf10"`);
        await queryRunner.query(`ALTER TABLE "regulated_profession" DROP COLUMN "industryId"`);
        await queryRunner.query(`DROP TABLE "industry"`);
    }

}
