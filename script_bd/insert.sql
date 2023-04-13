INSERT INTO INGREDIENTE
  (ingrediente_id,nombre_ingrediente,unidad_ingrediente,objectURL_ingrediente,nombre_imagen,datos_imagen,proteina_ingrediente)
VALUES
  ('5c50768e-4524-4e37-9e33-926809f0b957','Tomate','Gramos',null,null, null,'No'),
  ('fda6d542-2b31-4c2a-b54d-922068df57f4','Lechuga','Gramos',null,null, null,'No'),
  ('50eb5311-c26f-4f09-a773-410e93c2a73a','Pan','Unidad',null,null, null,'No'),
  ('15e6300c-2256-440a-adaa-56432c06cb2c','Carne','Unidad',null,null, null,'Si'),
  ('8ea16eda-75bc-433a-af5d-c0c91cb7020b','Queso','Onzas',null,null, null,'No'),
  ('67d68a20-1b7d-47dd-bf25-67d10749a316','Cebolla','Gramos',null,null, null,'No'),
  ('6685517f-28c7-4e8f-97fc-6381873fa953','Huevo','Unidad',null,null, null,'No'),
  ('e2241593-117f-4611-80cd-ec839bc060eb','Pollo','unidad',null,null, null,'Si');

INSERT INTO estado
  (estado_id, nombre_estado)
VALUES
  ('137d5ed8-0845-437d-85fe-11503254c0b4','En proceso'),
  ('3226cb55-f1b1-44d6-b66f-0c30c2c928cb','Cancelado'),
  ('e9272c77-8204-49a2-86d0-8ebbde572d66','Terminado'),
  ('60d50c1c-6da9-4ab2-b464-0bf2477a5ed8','En camino'),
  ('72f0eb68-4ce3-4f9f-a2bb-6df9244ba391','Entregado');
  
INSERT INTO PRODUCTO
  (producto_id,nombre_producto,tipo_producto,costo_producto,nombre_imagen)
VALUES
  ('41feae1f-8693-447f-9cbc-7a7376cdb952','Hamburguesa Mixta','Hamburguesa', '20','16891a7a-52f8-4bc6-8176-00a5ae0b1c0a.jpg'),
  ('7311087b-66a2-4823-b2d0-f339025f5074','Hamburguesa Simple','Hamburguesa', '20','16891a7a-52f8-4bc6-8176-00a5ae0b1c0a.jpg'),
  ('34512c69-846c-452c-a614-4a188b2f4655','Papas fritas','Hamburguesa', '20','16891a7a-52f8-4bc6-8176-00a5ae0b1c0a.jpg'),
  ('028fe195-d3b5-478f-8b23-7b2c41be3f3f','Papas fritas con queso','Hamburguesa', '20','16891a7a-52f8-4bc6-8176-00a5ae0b1c0a.jpg'),
  ('d1d58dd1-6fb4-4c68-a9a0-bc3f5ebc6677','Hamburguesa de pollo','Hamburguesa', '20','16891a7a-52f8-4bc6-8176-00a5ae0b1c0a.jpg');

INSERT INTO COMBO
  (combo_id,nombre_combo,tiempo_aprox_preparacion_combo,precio_unitario_combo)
VALUES
  ('a96deb10-44c2-4230-8528-5c78c50e1651','Super big Shelby Burguer','20 min','20$'),
  ('22b4f9eb-2d1c-4efa-934c-b77e151ef622','Simple Shleby Burguer','7 min','5$'),
  ('1bcce481-f205-45de-873d-3302b4267dd7','Smple Shelby Burguer con papas','10 min','8$'),
  ('57c9cd06-a7f1-4912-a1ae-fe2f4cf00996','Papas simples','4 min','2$'),
  ('f0cca324-deac-4cfa-a033-cc4fa191f5da','Papas dobles','5 min','4$');

INSERT INTO IGDT_PDT
  (igdt_pdt_id,cantidad_igdt_pdt,ingrediente_id,producto_id)
VALUES
  ('ad6b1f17-82c5-4e9a-8c2a-736e9a8d4306',2,'5c50768e-4524-4e37-9e33-926809f0b957','41feae1f-8693-447f-9cbc-7a7376cdb952'),
  ('6aaffbc3-210f-4ed0-96ef-1819bfc9433b',1,'e2241593-117f-4611-80cd-ec839bc060eb','41feae1f-8693-447f-9cbc-7a7376cdb952'),
  ('e9525b6d-6aa4-4ee9-98c8-186e76b5f727',1,'15e6300c-2256-440a-adaa-56432c06cb2c','41feae1f-8693-447f-9cbc-7a7376cdb952'),
  ('90769cfa-5bec-4afc-8151-375e37b7e41f',2,'8ea16eda-75bc-433a-af5d-c0c91cb7020b','41feae1f-8693-447f-9cbc-7a7376cdb952'),
  ('944d06bf-3438-407c-94b3-576ac85fb64b',10,'67d68a20-1b7d-47dd-bf25-67d10749a316','41feae1f-8693-447f-9cbc-7a7376cdb952'),
  ('0e26e271-89ac-421d-82c9-174b6f87b246',1,'6685517f-28c7-4e8f-97fc-6381873fa953','41feae1f-8693-447f-9cbc-7a7376cdb952'),
  ('0d8c9459-e3c6-40a6-85c9-37dd628cfb63',20,'fda6d542-2b31-4c2a-b54d-922068df57f4','41feae1f-8693-447f-9cbc-7a7376cdb952'),
  ('8bf1c9c9-68f6-41f8-a0cf-1b0b839cde5c',15,'5c50768e-4524-4e37-9e33-926809f0b957','41feae1f-8693-447f-9cbc-7a7376cdb952');

INSERT INTO PDT_CB
  (pdt_cd_id,cantidad_pdt_cb,producto_id,combo_id)
VALUES
  ('a0f8126e-8dce-4ebd-8d4a-d73a1df21042',2,'41feae1f-8693-447f-9cbc-7a7376cdb952','a96deb10-44c2-4230-8528-5c78c50e1651'),
  ('d984f1a3-ac02-4451-9444-877be5324d51',1,'7311087b-66a2-4823-b2d0-f339025f5074','a96deb10-44c2-4230-8528-5c78c50e1651'),
  ('e707c845-123e-4e4f-a95d-81093c92023d',2,'028fe195-d3b5-478f-8b23-7b2c41be3f3f','a96deb10-44c2-4230-8528-5c78c50e1651'),
  ('a215c172-0e0b-4c61-8c6e-83785b265a3e',1,'7311087b-66a2-4823-b2d0-f339025f5074','22b4f9eb-2d1c-4efa-934c-b77e151ef622'),
  ('22eeca3c-44cd-442d-a522-93414cf56d4b',1,'7311087b-66a2-4823-b2d0-f339025f5074','1bcce481-f205-45de-873d-3302b4267dd7'),
  ('3430003e-0634-431f-aaf5-75d435581f18',1,'34512c69-846c-452c-a614-4a188b2f4655','1bcce481-f205-45de-873d-3302b4267dd7'),
  ('6300bce6-1290-4d80-bd62-de60bb73da59',1,'34512c69-846c-452c-a614-4a188b2f4655','57c9cd06-a7f1-4912-a1ae-fe2f4cf00996'),
  ('ddaa2038-78b5-4c4f-b3e2-ead0bac75571',2,'028fe195-d3b5-478f-8b23-7b2c41be3f3f','f0cca324-deac-4cfa-a033-cc4fa191f5da');

INSERT INTO users
  (users_id,nombre_users, apellido_users, cedula_users, telefono_users, direccion_users, fecha_inicio_users, fecha_final_users,email_users,password_users,preguntaSecreta_users, respuestaPregunta_users)
VALUES
  ('5c50768e-4524-4e37-9e33-926809f0b4j1','Diego','Rojas','26111750', '04129642599', 'Artigas', '15/2/2023', null , 'diego.ard@gmail.com', '1803998', 'Que dia naci?','18031998'),
  ('5c50768e-4524-4e37-9e33-926809f0bi81','DiegoAdmin', 'Rojas','26111750', '04129642599', 'Artigas', '15/2/2023', null,'diegoAdmin.ard@gmail.com', '1803998', 'Que dia naci?','18031998');
 
INSERT INTO roles
  (roles_id,nombre_roles,descripcion_roles)
VALUES
  ('5c50768e-4524-4e37-9e33-926809f0dr41','Cajero', 'Hace toda las funciones de un cajero'),
  ('5c50768e-4524-4e37-9e33-926809f0e941','Admin', 'Hace toda las funciones de un admin');

INSERT INTO user_role
  (user_role_id,roles_id,users_id)
VALUES
  ('5c50768e-4524-4e37-9e33-926809f15g41','5c50768e-4524-4e37-9e33-926809f0dr41', '5c50768e-4524-4e37-9e33-926809f0b4j1'),
  ('5c50768e-4524-4e37-9e33-926809f152v1','5c50768e-4524-4e37-9e33-926809f0e941', '5c50768e-4524-4e37-9e33-926809f0bi81');

 