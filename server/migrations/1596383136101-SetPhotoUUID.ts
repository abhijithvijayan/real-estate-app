import {MigrationInterface, QueryRunner} from "typeorm";

export class SetPhotoUUID1596383136101 implements MigrationInterface {
    name = 'SetPhotoUUID1596383136101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id")`);
    }

}
