import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationProductoYLugar1678210783717
  implements MigrationInterface
{
  name = 'MigrationProductoYLugar1678210783717';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cliente_entity" ("id_cliente" character varying NOT NULL, "cedula_cliente" character varying(10) NOT NULL, "nombre_cliente" character varying(20) NOT NULL, "apellido_cliente" character varying(20) NOT NULL, "telefono_cliente" character varying(11) NOT NULL, "id_lugar_cliente" character varying, CONSTRAINT "PK_4b0ed7da8cc4aaec9a36fbf273d" PRIMARY KEY ("id_cliente"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lugar_entity_tipo_lugar_enum" AS ENUM('Zona', 'Dirección', 'Referencia')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lugar_entity" ("id_lugar" character varying NOT NULL, "nombre_lugar" character varying(100) NOT NULL, "tipo_lugar" "public"."lugar_entity_tipo_lugar_enum" NOT NULL, "precio" real, "id_lugar_padre" character varying, CONSTRAINT "PK_cf9bdfa039e2b22abd655f48cd5" PRIMARY KEY ("id_lugar"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingrediente" ("ingrediente_id" character varying NOT NULL, "nombre_ingrediente" character varying(300) NOT NULL, "unidad_ingrediente" character varying(300) NOT NULL, "objecturl_ingrediente" character varying(300), "nombre_imagen" character varying(300), "datos_imagen" bytea, "proteina_ingrediente" character varying(300), CONSTRAINT "PK_1d7058637540e5e57081261ef7f" PRIMARY KEY ("ingrediente_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "igdt_pdt" ("igdt_pdt_id" character varying NOT NULL, "cantidad_igdt_pdt" character varying(300) NOT NULL, "ingrediente_id" character varying(300), "producto_id" character varying(300), CONSTRAINT "PK_6e7e935907dd51286f986187630" PRIMARY KEY ("igdt_pdt_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "producto" ("producto_id" character varying NOT NULL, "nombre_producto" character varying(300), "tipo_producto" character varying(300), "costo_producto" character varying(300), "nombre_imagen" character varying(300), CONSTRAINT "PK_2415b88c222785d1f2da05acff9" PRIMARY KEY ("producto_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pdt_cb" ("pdt_cd_id" character varying NOT NULL, "cantidad_pdt_cb" character varying(300) NOT NULL, "producto_id" character varying(300) NOT NULL, "combo_id" character varying(300) NOT NULL, CONSTRAINT "PK_a0b4ffbb7714019823fb9506f2c" PRIMARY KEY ("pdt_cd_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "combo" ("combo_id" character varying NOT NULL, "nombre_combo" character varying(300) NOT NULL, "tiempo_aprox_preparacion_combo" character varying(300) NOT NULL, "precio_unitario_combo" character varying(300) NOT NULL, CONSTRAINT "PK_8d813bcc2c55a1b44a857e51ff1" PRIMARY KEY ("combo_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cliente_entity" ADD CONSTRAINT "FK_8e062baa9659cb6b502ae261c15" FOREIGN KEY ("id_lugar_cliente") REFERENCES "lugar_entity"("id_lugar") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lugar_entity" ADD CONSTRAINT "FK_cf46a9678fa544bdc0fa96bf7e2" FOREIGN KEY ("id_lugar_padre") REFERENCES "lugar_entity"("id_lugar") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "igdt_pdt" ADD CONSTRAINT "FK_35a2b160aac6be57bba1164dddf" FOREIGN KEY ("ingrediente_id") REFERENCES "ingrediente"("ingrediente_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "igdt_pdt" ADD CONSTRAINT "FK_0119d5c053ac86813e45d52e9d3" FOREIGN KEY ("producto_id") REFERENCES "producto"("producto_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pdt_cb" ADD CONSTRAINT "FK_a0b4ffbb7714019823fb9506f2c" FOREIGN KEY ("pdt_cd_id") REFERENCES "producto"("producto_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pdt_cb" ADD CONSTRAINT "FK_c0ccf942ac1165070b9bd921051" FOREIGN KEY ("producto_id") REFERENCES "combo"("combo_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pdt_cb" DROP CONSTRAINT "FK_c0ccf942ac1165070b9bd921051"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pdt_cb" DROP CONSTRAINT "FK_a0b4ffbb7714019823fb9506f2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "igdt_pdt" DROP CONSTRAINT "FK_0119d5c053ac86813e45d52e9d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "igdt_pdt" DROP CONSTRAINT "FK_35a2b160aac6be57bba1164dddf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lugar_entity" DROP CONSTRAINT "FK_cf46a9678fa544bdc0fa96bf7e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cliente_entity" DROP CONSTRAINT "FK_8e062baa9659cb6b502ae261c15"`,
    );
    await queryRunner.query(`DROP TABLE "combo"`);
    await queryRunner.query(`DROP TABLE "pdt_cb"`);
    await queryRunner.query(`DROP TABLE "producto"`);
    await queryRunner.query(`DROP TABLE "igdt_pdt"`);
    await queryRunner.query(`DROP TABLE "ingrediente"`);
    await queryRunner.query(`DROP TABLE "lugar_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."lugar_entity_tipo_lugar_enum"`,
    );
    await queryRunner.query(`DROP TABLE "cliente_entity"`);
  }
}
