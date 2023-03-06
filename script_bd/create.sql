--**************************************************
--*   NAME:         SHELBY BURGUER                 *
--*   DATE:         2023-1                         *
--*   DESCRIPTION:  DDL FOR SHELBY BURGUER         *
--*   VERSION:      V1.0                           *
--*   DATA BASE:    POSTGRESQL                     *
--**************************************************
--**************************************************
--*                                                *
--*   DDL FOR TABLES                               *	
--*                                                *
--**************************************************

create table INGREDIENTE
(
     ingrediente_id varchar(100) not null,
     nombre_ingrediente varchar(70) not null,
     unidad_ingrediente varchar(70) null,
     objectURL_ingrediente varchar(70) null,
     nombre_imagen varchar(70) null,
     datos_imagen bytea null,
     proteina_ingrediente varchar(70) null,
     constraint pk_ingrediente_id primary key (ingrediente_id)	

);

create table IGDT_PDT
(
     igdt_pdt_id varchar(100) not null,
     cantidad_igdt_pdt numeric(5) not null,
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
     nombre_imagen varchar(70) not null,
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

alter table IGDT_PDT
    add constraint fk_id_igdt_pdt_ingrediente foreign key (ingrediente_id) references INGREDIENTE(ingrediente_id),
    add constraint fk_id_igdt_pdt_producto foreign key (producto_id) references PRODUCTO(producto_id)
;

alter table PDT_CB
    add constraint fk_id_igdt_pdt_ingrediente foreign key (producto_id) references PRODUCTO(producto_id),
    add constraint fk_id_igdt_pdt_producto foreign key (combo_id) references COMBO(combo_id)
;