import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePropertyModel1596410577448 implements MigrationInterface {
    name = 'UpdatePropertyModel1596410577448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "longDescription"`);
        await queryRunner.query(`ALTER TABLE "property" ADD "longDescription" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "longDescription"`);
        await queryRunner.query(`ALTER TABLE "property" ADD "longDescription" character varying(400) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "title"`);
    }

}
