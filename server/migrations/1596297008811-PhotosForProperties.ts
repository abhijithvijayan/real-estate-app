import {MigrationInterface, QueryRunner} from "typeorm";

export class PhotosForProperties1596297008811 implements MigrationInterface {
    name = 'PhotosForProperties1596297008811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying(64) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0df1ffc03f0ce86e81a9d6cef1e" UNIQUE ("name", "code"), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying(64) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2f3ca6bb9144e7ae3dde21209a5" UNIQUE ("code", "name"), CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f8c0858628830a35f19efdc0ecf" UNIQUE ("name"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "zip_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "countryId" uuid, "stateId" uuid, "cityId" uuid, CONSTRAINT "PK_23e29929d32a535be7820652aad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(96) NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "zipCodeId" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favourite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b948b7e965123f9ca0b60383334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(64) NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userFavouriteId" uuid, "userListingId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_5ff4ab0aa571d2b17ae77c3c41" UNIQUE ("userFavouriteId"), CONSTRAINT "REL_fb3cd5c1672f44ec7c840df059" UNIQUE ("userListingId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae7a06d62e039988a5e9ca97507" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "squareMeter" numeric NOT NULL, "shortDescription" character varying(180) NOT NULL, "longDescription" character varying(400) NOT NULL, "noOfRooms" integer NOT NULL, "noOfBedRooms" integer NOT NULL, "noOfBathRooms" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "listingId" uuid, CONSTRAINT "REL_276968c3960cc79910f8ef3cf4" UNIQUE ("addressId"), CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "propertyId" uuid, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favourite_properties_property" ("userFavouriteId" uuid NOT NULL, "propertyId" uuid NOT NULL, CONSTRAINT "PK_6361607eef6b794b757c3796083" PRIMARY KEY ("userFavouriteId", "propertyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e3db102c606cc78d89c2bfca8" ON "user_favourite_properties_property" ("userFavouriteId") `);
        await queryRunner.query(`CREATE INDEX "IDX_00a2e39301ecd61092b6f3b335" ON "user_favourite_properties_property" ("propertyId") `);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "zip_code" ADD CONSTRAINT "FK_4c935ec36e6e8d3af3c8ae3590c" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "zip_code" ADD CONSTRAINT "FK_905cfb30a9599192a4ab4c9443c" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "zip_code" ADD CONSTRAINT "FK_5bbe448e83da2b8be1846638630" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_5614fb41e9fe1e998f6b1de6d01" FOREIGN KEY ("zipCodeId") REFERENCES "zip_code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5ff4ab0aa571d2b17ae77c3c411" FOREIGN KEY ("userFavouriteId") REFERENCES "user_favourite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb3cd5c1672f44ec7c840df0595" FOREIGN KEY ("userListingId") REFERENCES "user_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_276968c3960cc79910f8ef3cf4b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_7001419215eaec129908be240fd" FOREIGN KEY ("listingId") REFERENCES "user_listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_3c436075fa7feb9f9fb9e20f61b" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favourite_properties_property" ADD CONSTRAINT "FK_4e3db102c606cc78d89c2bfca8d" FOREIGN KEY ("userFavouriteId") REFERENCES "user_favourite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favourite_properties_property" ADD CONSTRAINT "FK_00a2e39301ecd61092b6f3b335a" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "user_favourite_properties_property" DROP CONSTRAINT "FK_00a2e39301ecd61092b6f3b335a"`);
        await queryRunner.query(`ALTER TABLE "user_favourite_properties_property" DROP CONSTRAINT "FK_4e3db102c606cc78d89c2bfca8d"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_3c436075fa7feb9f9fb9e20f61b"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_7001419215eaec129908be240fd"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_276968c3960cc79910f8ef3cf4b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb3cd5c1672f44ec7c840df0595"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5ff4ab0aa571d2b17ae77c3c411"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_5614fb41e9fe1e998f6b1de6d01"`);
        await queryRunner.query(`ALTER TABLE "zip_code" DROP CONSTRAINT "FK_5bbe448e83da2b8be1846638630"`);
        await queryRunner.query(`ALTER TABLE "zip_code" DROP CONSTRAINT "FK_905cfb30a9599192a4ab4c9443c"`);
        await queryRunner.query(`ALTER TABLE "zip_code" DROP CONSTRAINT "FK_4c935ec36e6e8d3af3c8ae3590c"`);
        await queryRunner.query(`DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP INDEX "IDX_00a2e39301ecd61092b6f3b335"`);
        await queryRunner.query(`DROP INDEX "IDX_4e3db102c606cc78d89c2bfca8"`);
        await queryRunner.query(`DROP TABLE "user_favourite_properties_property"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "property"`);
        await queryRunner.query(`DROP TABLE "user_listing"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user_favourite"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "zip_code"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
