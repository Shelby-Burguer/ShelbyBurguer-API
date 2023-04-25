--**************************************************
--*   NAME:         SHELBY BURGUER                 *
--*   DATE:         2023-3                         *
--*   DESCRIPTION:  DDL FOR SHELBY BURGUER         *
--*   VERSION:      V1.0                           *
--*   DATA BASE:    POSTGRESQL                     *
--**************************************************
--**************************************************
--*                                                *
--*   DDL FOR TABLES                               *	
--*                                                *
--**************************************************
-- CORRER SOLO LA PRIMERA VEZ
-- CREATE TYPE "public"."lugar_tipo_lugar_enum" AS ENUM('Zona', 'Dirección', 'Referencia');
create table INGREDIENTE
(
     ingrediente_id varchar(100) not null,
     nombre_ingrediente varchar(70) not null,
     unidad_ingrediente varchar(70) null,
     objectURL_ingrediente varchar(70) null,
     nombre_imagen varchar(70) null,
     datos_imagen bytea null,
     proteina_ingrediente varchar(70) null,
     extra varchar(70) null,
     constraint pk_ingrediente_id primary key (ingrediente_id)	

);


create table IGDT_PDT
(
     igdt_pdt_id varchar(100) not null,
     cantidad_igdt_pdt numeric(5) not null,
     precio_igdt_pdt varchar(100) null,
     ingrediente_id varchar(100) not null,
     producto_id varchar(100) not null,
     constraint pk_igdt_pdt_id primary key (igdt_pdt_id) 	
);

create table PRODUCTO
( 
     producto_id varchar(70) not null,
     nombre_producto varchar(70) not null,
     tipo_producto varchar(70) not null,
     costo_producto varchar(70) not null,
     nombre_imagen varchar(70) null,
     constraint pk_producto_id primary key (producto_id) 	
);

create table PDT_CB
( 
     pdt_cd_id varchar(70) not null,
     cantidad_pdt_cb numeric(5) not null,
     producto_id varchar(70) not null,
     combo_id  varchar(70) not null,
     constraint pk_pdt_cb_id primary key (pdt_cd_id) 	
);

create table COMBO
( 
     combo_id  varchar(70) not null,
     nombre_combo varchar(70) not null,
     tiempo_aprox_preparacion_combo varchar(20) not null,
     precio_unitario_combo varchar(10) not null,
     constraint pk_combo_id primary key (combo_id) 	
);

create table PDTCB_OD
( 
     pdtcb_od_id  varchar(70) not null,
     orden_id varchar(70) not null,
     producto_id varchar(70) null,
     combo_id varchar(70) null,
     constraint pk_pdtcb_od_id primary key (pdtcb_od_id) 	
);

create table CARRITO
(	 
     carrito_id  varchar(70) not null,
     producto_id varchar(70) null,
     orden_id varchar(70) null,
     constraint pk_orden primary key (carrito_id)
);

CREATE TABLE ORDEN (
  orden_id varchar(70) not null,
  fecha_orden varchar(70) null,
  hora_orden varchar(20) null,
  numero_mesa varchar(10) null,
  descuento varchar(70) null,
  tipo_orden varchar(70) null,
  total_orden varchar(70) null,
  numero_orden numeric not null,
  cliente_id character varying null,
  constraint pk_orden_id primary key (orden_id)
);

CREATE TABLE orden_lugar (
  orden_lugar_id varchar(70) not null,
  orden_id varchar(70) null,
  lugar_id varchar(70) null,
  precio_historico varchar(10) null,
  constraint pk_orden_lugar_id primary key (orden_id)
);

CREATE TABLE estado (
  estado_id varchar(70) not null,
  nombre_estado varchar(70) null,
  constraint pk_estado_id primary key (estado_id)
);

CREATE TABLE estado_orden (
  estado_orden_id varchar(70) not null,
  fecha_historial varchar(70) null,
  orden_id varchar(70) null,
  estado_id varchar(70) null,
  constraint pk_estado_orden_id primary key (estado_orden_id)
);

CREATE TABLE pago_electronico (
  pago_id varchar(70) not null,
  numero_referencia varchar(70) null,
  tipo_pago varchar(70) null,
  constraint pk_pago_electronico_id primary key (pago_id)
);

CREATE TABLE pago_efectivo (
  dolares_efectivo_id varchar(70) not null,
  numero_serie varchar(70) null,
  denominacion varchar(70) null,
  cantidad_billetes varchar(70) null,
  tipo_pago varchar(70) null,
  constraint pk_pago_efectivo_id primary key (dolares_efectivo_id)
);

CREATE TABLE zelle (
  zelle_id varchar(70) not null,
  correo_electronico varchar(70) null,
  constraint pk_zelle_id primary key (zelle_id)
);

CREATE TABLE orden_pago (
  orden_pago_id varchar(70) not null,
  orden_id varchar(70) null,
  pago_id varchar(70) null,
  zelle_id varchar(70) null,
  montoBs_Dolares_id varchar(70) null,
  fecha_historial varchar(70) null,
  monto varchar(70) null,
  monto_dolares varchar(70) null,
  constraint pk_orden_pago_id primary key (orden_pago_id)
);

CREATE TABLE montobs_dolares (
  montobs_dolares_id varchar(70) not null,
  monto varchar(70) null,
  fecha_historial varchar(70) null,
  constraint pk_montoBs_Dolares_id primary key (montobs_dolares_id)
);

CREATE TABLE users (
  users_id varchar(70) not null,
  nombre_users varchar(70) null,
  apellido_users varchar(70) null,
  cedula_users varchar(70) null,
  telefono_users varchar(70) null,
  direccion_users varchar(70) null,
  fecha_inicio_users varchar(70) null,
  fecha_final_users varchar(70),
  email_users varchar(70) null,
  password_users varchar(70) null,
  preguntaSecreta_users varchar(70) null,
  respuestaPregunta_users varchar(70) null,
  constraint pk_users_id primary key (users_id)
);

CREATE TABLE roles (
  roles_id varchar(70) not null,
  nombre_roles varchar(70) null,
  descripcion_roles varchar(70) null,
  constraint pk_roles_id primary key (roles_id)
);

CREATE TABLE user_role (
  user_role_id varchar(70) not null,
  roles_id varchar(70) null,
  users_id varchar(70) null,
  constraint pk_user_role_id primary key (user_role_id)
);

CREATE TABLE registro_producto (
  registro_producto_id varchar(70) not null,
  ingrediente_id varchar(70) null,
  producto_id varchar(70) null,
  pdtcb_od_id varchar(70) null,
  cantidad varchar(70) null,
  precio varchar(70) null,
  constraint pk_registro_producto_id primary key (registro_producto_id)
);

create table carrito_ingrediente
(	 
     carrito_ingrediente_id varchar(70) not null,
     ingrediente_id varchar(70) null,
     producto_id varchar(70) null,
     cantidad varchar(70) null,
     precio varchar(70) null,
     constraint pk_carrito_ingrediente_id primary key (carrito_ingrediente_id)
);

create table carritoIngrediente_carrito
(	 
  carritoingrediente_carrito_id varchar(70) not null,
  carrito_ingrediente_id varchar(70) not null,
  carrito_id varchar(70) not null,
  constraint pk_carritoIngrediente_carrito primary key (carritoingrediente_carrito_id)
);

CREATE TABLE pagoEfectivo_ordenPago(
  pagoefectivo_ordenpago_id varchar(70) not null,
  dolares_efectivo_id varchar(70) null,
  orden_pago_id varchar(70) null,
  constraint pk_pagoefectivo_ordenpago_id primary key (pagoEfectivo_ordenpago_id)
);

CREATE TABLE "cliente" ("id_cliente" character varying NOT NULL, "cedula_cliente" character varying(10) NOT NULL, "nombre_cliente" character varying(20) NOT NULL, "apellido_cliente" character varying(20), "telefono_cliente" character varying(11), "id_lugar_cliente" character varying, CONSTRAINT "PK_dbf4725e2849f4036253ee7dbd0" PRIMARY KEY ("id_cliente"));

CREATE TABLE "lugar" ("id_lugar" character varying NOT NULL, "nombre_lugar" character varying(100) NOT NULL, "tipo_lugar" "public"."lugar_tipo_lugar_enum" NOT NULL, "precio_lugar" real, "id_padre_lugar" character varying, CONSTRAINT "PK_a058a781463d243964c637c3ce9" PRIMARY KEY ("id_lugar"));

ALTER TABLE "cliente" ADD CONSTRAINT "FK_d9cf8c718ba2133c20c14db42c3" FOREIGN KEY ("id_lugar_cliente") REFERENCES "lugar"("id_lugar") ON DELETE NO ACTION ON UPDATE NO action;

ALTER TABLE "lugar" ADD CONSTRAINT "FK_40df63a39c51e4df499e3dfd87c" FOREIGN KEY ("id_padre_lugar") REFERENCES "lugar"("id_lugar") ON DELETE NO ACTION ON UPDATE NO action;

alter table IGDT_PDT
    add constraint fk_id_igdt_pdt_ingrediente foreign key (ingrediente_id) references INGREDIENTE(ingrediente_id) ON DELETE CASCADE,
    add constraint fk_id_igdt_pdt_producto foreign key (producto_id) references PRODUCTO(producto_id) ON DELETE CASCADE
;

alter table PDT_CB
    add constraint fk_id_igdt_pdt_ingrediente foreign key (producto_id) references PRODUCTO(producto_id) ON DELETE CASCADE,
    add constraint fk_id_igdt_pdt_producto foreign key (combo_id) references COMBO(combo_id) ON DELETE CASCADE
;

alter table PDTCB_OD
    add constraint fk_id_pdtcb_od_orden foreign key (orden_id) references ORDEN(orden_id) ON DELETE CASCADE,
    add constraint fk_id_pdtcb_od_producto foreign key (producto_id) references PRODUCTO(producto_id) ON DELETE CASCADE,
    add constraint fk_id_pdtcb_od_combo foreign key (combo_id) references COMBO(combo_id) ON DELETE CASCADE
;

alter table ORDEN
    add constraint fk_id_cliente_orden foreign key (cliente_id) references cliente(id_cliente) ON DELETE CASCADE
;

alter table orden_lugar
    add constraint fk_id_orden_lugar_orden foreign key (orden_id) references ORDEN(orden_id) ON DELETE cascade,
    add constraint fk_id_lugar_orden_lugar foreign key (lugar_id) references lugar(id_lugar) ON DELETE CASCADE
;

alter table estado_orden
    add constraint fk_id_orden_estado_orden foreign key (orden_id) references ORDEN(orden_id) ON DELETE cascade,
    add constraint fk_id_estado_estado_orden foreign key (estado_id) references estado(estado_id) ON DELETE CASCADE
;

alter table orden_pago
    add constraint fk_id_orden_pago_orden foreign key (orden_id) references ORDEN(orden_id) ON DELETE cascade,
    add constraint fk_id_orden_pago_pago_electronico foreign key (pago_id) references pago_electronico(pago_id) ON DELETE cascade,
    add constraint fk_id_orden_pago_zelle foreign key (zelle_id) references zelle(zelle_id) ON DELETE cascade,
    add constraint fk_id_orden_montobs_dolares foreign key (montobs_dolares_id) references montobs_dolares(montobs_dolares_id) ON DELETE cascade
;

alter table user_role
    add constraint fk_id_user_role_users foreign key (users_id) references users(users_id) ON DELETE cascade,
    add constraint fk_id_user_role_roles foreign key (roles_id) references roles(roles_id) ON DELETE CASCADE
;


ALTER TABLE carritoIngrediente_carrito
ADD CONSTRAINT fk_carritoIngrediente_carrito_carritoIngrediente FOREIGN KEY (carrito_ingrediente_id) REFERENCES CARRITO_INGREDIENTE(carrito_ingrediente_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_carritoIngrediente_carrito_carrito FOREIGN KEY (carrito_id) REFERENCES carrito(carrito_id) ON DELETE CASCADE;


alter table registro_producto
    add constraint fk_id_registro_producto_pdtcb_od foreign key (pdtcb_od_id) references PDTCB_OD(pdtcb_od_id) ON DELETE cascade,
    add constraint fk_id_registro_producto_ingrediente foreign key (ingrediente_id) references INGREDIENTE(ingrediente_id) ON DELETE cascade,
    add constraint fk_id_registro_producto_producto foreign key (producto_id) references PRODUCTO(producto_id) ON DELETE CASCADE
;
-- DROP TYPE IF EXISTS "public"."lugar_tipo_lugar_enum";