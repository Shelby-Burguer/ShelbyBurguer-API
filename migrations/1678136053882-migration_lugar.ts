import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationLugar1678136053882 implements MigrationInterface {
  name = 'MigrationLugar1678136053882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cliente_entity" ("id_cliente" character varying NOT NULL, "cedula_cliente" character varying(10) NOT NULL, "nombre_cliente" character varying(20) NOT NULL, "apellido_cliente" character varying(20) NOT NULL, "telefono_cliente" character varying(11) NOT NULL, "id_lugar_cliente" character varying, CONSTRAINT "PK_4b0ed7da8cc4aaec9a36fbf273d" PRIMARY KEY ("id_cliente"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lugar_entity_tipo_lugar_enum" AS ENUM('Zona', 'Dirección', 'Referencia')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lugar_entity" ("id_lugar" character varying NOT NULL, "nombre_lugar" character varying(40) NOT NULL, "tipo_lugar" "public"."lugar_entity_tipo_lugar_enum" NOT NULL, "precio" real NOT NULL, CONSTRAINT "PK_cf9bdfa039e2b22abd655f48cd5" PRIMARY KEY ("id_lugar"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cliente_entity" ADD CONSTRAINT "FK_8e062baa9659cb6b502ae261c15" FOREIGN KEY ("id_lugar_cliente") REFERENCES "lugar_entity"("id_lugar") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cliente_entity" DROP CONSTRAINT "FK_8e062baa9659cb6b502ae261c15"`,
    );
    await queryRunner.query(`DROP TABLE "lugar_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."lugar_entity_tipo_lugar_enum"`,
    );
    await queryRunner.query(`DROP TABLE "cliente_entity"`);
  }
}
