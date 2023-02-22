--**************************************************
--*   NAME:         SHELBY BURGUER                 *
--*   DATE:         2023-2                         *
--*   DESCRIPTION:  DDL FOR SHELBY BURGUER M2      *
--*   VERSION:      V1.0                           *
--*   DATA BASE:    POSTGRESQL                     *
--**************************************************
--**************************************************
--*                                                *
--*   DDL FOR CLIENTE & LUGAR                      *	
--*                                                *
--**************************************************
CREATE TABLE CLIENTE (
  id_cliente VARCHAR(100) NOT NULL,
  cedula_cliente VARCHAR(10) NOT NULL,
  nombre_cliente VARCHAR(20) NOT NULL,
  apellido_cliente VARCHAR(20) NOT NULL,
  telefono_cliente VARCHAR(11) NULL,
  id_lugar_cliente VARCHAR(100) NULL,
  constraint pk_id_cliente primary key (id_cliente),
  constraint fk_id_lugar_cliente foreign key (id_lugar_cliente) references LUGAR(id_lugar)
);
CREATE TABLE LUGAR (
  id_lugar VARCHAR(100) NOT NULL,
  nombre_lugar VARCHAR(40) NOT NULL,
  tipo_lugar VARCHAR(10) NOT NULL CHECK(tipo_lugar IN('Zona', 'Dirección', 'Referencia')),
  precio REAL NOT NULL,
  id_lugar_padre VARCHAR(100) NULL,
  constraint pk_id_lugar primary key (id_lugar)
);