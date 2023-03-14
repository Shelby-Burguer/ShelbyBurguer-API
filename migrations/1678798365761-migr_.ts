import { MigrationInterface, QueryRunner } from 'typeorm';

export class migr_1678798365761 implements MigrationInterface {
  name = 'migr_1678798365761';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cliente" ("id_cliente" character varying NOT NULL, "cedula_cliente" character varying(10) NOT NULL, "nombre_cliente" character varying(20) NOT NULL, "apellido_cliente" character varying(20), "telefono_cliente" character varying(11), "id_lugar_cliente" character varying, CONSTRAINT "PK_dbf4725e2849f4036253ee7dbd0" PRIMARY KEY ("id_cliente"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lugar_tipo_lugar_enum" AS ENUM('Zona', 'Dirección', 'Referencia')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lugar" ("id_lugar" character varying NOT NULL, "nombre_lugar" character varying(100) NOT NULL, "tipo_lugar" "public"."lugar_tipo_lugar_enum" NOT NULL, "precio_lugar" real, "id_padre_lugar" character varying, CONSTRAINT "PK_a058a781463d243964c637c3ce9" PRIMARY KEY ("id_lugar"))`,
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
      `ALTER TABLE "cliente" ADD CONSTRAINT "FK_d9cf8c718ba2133c20c14db42c3" FOREIGN KEY ("id_lugar_cliente") REFERENCES "lugar"("id_lugar") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lugar" ADD CONSTRAINT "FK_40df63a39c51e4df499e3dfd87c" FOREIGN KEY ("id_padre_lugar") REFERENCES "lugar"("id_lugar") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "lugar" DROP CONSTRAINT "FK_40df63a39c51e4df499e3dfd87c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cliente" DROP CONSTRAINT "FK_d9cf8c718ba2133c20c14db42c3"`,
    );
    await queryRunner.query(`DROP TABLE "combo"`);
    await queryRunner.query(`DROP TABLE "pdt_cb"`);
    await queryRunner.query(`DROP TABLE "producto"`);
    await queryRunner.query(`DROP TABLE "igdt_pdt"`);
    await queryRunner.query(`DROP TABLE "ingrediente"`);
    await queryRunner.query(`DROP TABLE "lugar"`);
    await queryRunner.query(`DROP TYPE "public"."lugar_tipo_lugar_enum"`);
    await queryRunner.query(`DROP TABLE "cliente"`);
  }
}
