INSERT INTO INGREDIENTE (
    ingrediente_id,
    nombre_ingrediente,
    unidad_ingrediente,
    objectURL_ingrediente,
    nombre_imagen,
    datos_imagen,
    proteina_ingrediente
  )
VALUES (
    'fcb38c9a-be62-4ebe-b182-32704ede8bd3',
    'Mostaza',
    'Gramos',
    null,
    'mostaza.jpg',
    null,
    'No'
  ),
  (
    '282369a9-63a3-4b59-9dee-8bf3a75716e3',
    'Milanesa',
    'Unidad',
    null,
    'pollo-hamburguesa.jpg',
    null,
    'Si'
  ),
  (
    '3c9c76da-9de9-435e-88f2-d2d5f19fa430',
    'Papas al hilo',
    'Gramos',
    null,
    'papas al hilo.jpg',
    null,
    'No'
  ),
  (
    '40a39539-c565-40eb-8108-2b3ac572abdc',
    'Chistorra',
    'Gramos',
    null,
    'chistorra.jpg',
    null,
    'Si'
  ),
  (
    '4f0d59e6-56dc-471a-b41a-1bee63ade1f7',
    'Tocineta',
    'Gramos',
    null,
    'tocineta.jpg',
    null,
    'No'
  ),
  (
    '5e24a8d4-57e5-41ba-8071-1e568580208e',
    'Mayonesa',
    'Gramos',
    null,
    'mayonesa.jpg',
    null,
    'No'
  ),
  (
    '9ff30fc9-1fe7-4d1e-923d-d501e331bb41',
    'Queso Fundido',
    'Gramos',
    null,
    'queso-fundido.jpg',
    null,
    'No'
  ),
  (
    'a4ab46aa-21c1-4f1b-a3f3-650431c0f387',
    'Cebolla',
    'Gramos',
    null,
    'cebolla.jpg',
    null,
    'No'
  ),
  (
    'a8633ed4-fd66-4ce5-93a6-e7c6c993c88b',
    'Salsa de la casa',
    'Gramos',
    null,
    'salsa de la casa.jpg',
    null,
    'No'
  ),
  (
    'bb7b6458-ad08-481f-93e0-d139562fdfcd',
    'Chorizo',
    'Gramos',
    null,
    'chorizo.jpg',
    null,
    'Si'
  ),
  (
    'c21e670e-2f59-4520-8428-216bc3601a8b',
    'Carne',
    'Unidad',
    null,
    'carne-hamburguesa.jpg',
    null,
    'Si'
  ),
  (
    'c8c53f72-c92e-4291-8ec9-453e58a3d198',
    'Salsa de Tomate',
    'Gramos',
    null,
    'salsa-de-tomate.jpg',
    null,
    'No'
  ),
  (
    '04fafa32-eccc-4e07-b64a-a18bf26711c8',
    'Chuleta',
    'Unidad',
    null,
    'chuleta.jpg',
    null,
    'Si'
  );
INSERT INTO estado (estado_id, nombre_estado)
VALUES (
    '137d5ed8-0845-437d-85fe-11503254c0b4',
    'En proceso'
  ),
  (
    '3226cb55-f1b1-44d6-b66f-0c30c2c928cb',
    'Cancelado'
  ),
  (
    'e9272c77-8204-49a2-86d0-8ebbde572d66',
    'Terminado'
  ),
  (
    '60d50c1c-6da9-4ab2-b464-0bf2477a5ed8',
    'En camino'
  ),
  (
    '72f0eb68-4ce3-4f9f-a2bb-6df9244ba391',
    'Entregado'
  );
INSERT INTO PRODUCTO (
    producto_id,
    nombre_producto,
    tipo_producto,
    costo_producto,
    nombre_imagen
  )
VALUES (
    'd3c84506-e5be-433b-9f18-a3dd88f41b09',
    'Two Dólar',
    'Hamburguesa',
    '2',
    '16891a7a-52f8-4bc6-8176-00a5ae0b1c0a.jpg'
  );
INSERT INTO COMBO (
    combo_id,
    nombre_combo,
    tiempo_aprox_preparacion_combo,
    precio_unitario_combo
  )
VALUES (
    'a96deb10-44c2-4230-8528-5c78c50e1651',
    'Combo Two Dólar',
    '20 min',
    '5$'
  );
INSERT INTO IGDT_PDT (
    igdt_pdt_id,
    cantidad_igdt_pdt,
    ingrediente_id,
    producto_id
  )
VALUES (
    'd55f8d5b-3a73-4f26-a40e-bb74fed5907e',
    1,
    'c21e670e-2f59-4520-8428-216bc3601a8b',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    '5328bec0-c67e-4d82-913c-cb2042aaf961',
    1,
    'a4ab46aa-21c1-4f1b-a3f3-650431c0f387',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    '0e95da65-e8a5-4c55-ba42-dba39c5f9f60',
    1,
    '3c9c76da-9de9-435e-88f2-d2d5f19fa430',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    '9514512a-e50e-488d-83a5-3670c1217210',
    1,
    'fcb38c9a-be62-4ebe-b182-32704ede8bd3',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    'bf9b5d3b-2d0b-4c16-b623-599b56022c5c',
    1,
    '4f0d59e6-56dc-471a-b41a-1bee63ade1f7',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    '46a6f6e4-4da9-40ff-aa38-b9de1f8bd0b1',
    1,
    '5e24a8d4-57e5-41ba-8071-1e568580208e',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    '2577c678-5722-483c-a526-a2b0efaf475e',
    1,
    'a8633ed4-fd66-4ce5-93a6-e7c6c993c88b',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    'c6924cfc-7e5f-4479-b9e4-33b4da0a6cfe',
    1,
    '9ff30fc9-1fe7-4d1e-923d-d501e331bb41',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  ),
  (
    'a5ee914b-6a25-411e-9b18-dff78833937c',
    1,
    'c8c53f72-c92e-4291-8ec9-453e58a3d198',
    'd3c84506-e5be-433b-9f18-a3dd88f41b09'
  );
INSERT INTO PDT_CB (
    pdt_cd_id,
    cantidad_pdt_cb,
    producto_id,
    combo_id
  )
VALUES (
    'a0f8126e-8dce-4ebd-8d4a-d73a1df21042',
    2,
    'd3c84506-e5be-433b-9f18-a3dd88f41b09',
    'a96deb10-44c2-4230-8528-5c78c50e1651'
  );
INSERT INTO users (
    users_id,
    nombre_users,
    apellido_users,
    cedula_users,
    telefono_users,
    direccion_users,
    fecha_inicio_users,
    fecha_final_users,
    email_users,
    password_users,
    preguntaSecreta_users,
    respuestaPregunta_users
  )
VALUES (
    '5c50768e-4524-4e37-9e33-926809f0b4j1',
    'Diego',
    'Rojas',
    '26111750',
    '04129642599',
    'Artigas',
    '15/2/2023',
    null,
    'diego.ard@gmail.com',
    '1803998',
    'Que dia naci?',
    '18031998'
  ),
  (
    '5c50768e-4524-4e37-9e33-926809f0bi81',
    'DiegoAdmin',
    'Rojas',
    '26111750',
    '04129642599',
    'Artigas',
    '15/2/2023',
    null,
    'diegoAdmin.ard@gmail.com',
    '1803998',
    'Que dia naci?',
    '18031998'
  );
INSERT INTO roles (roles_id, nombre_roles, descripcion_roles)
VALUES (
    '5c50768e-4524-4e37-9e33-926809f0dr41',
    'Cajero',
    'Hace toda las funciones de un cajero'
  ),
  (
    '5c50768e-4524-4e37-9e33-926809f0e941',
    'Admin',
    'Hace toda las funciones de un admin'
  );
INSERT INTO user_role (user_role_id, roles_id, users_id)
VALUES (
    '5c50768e-4524-4e37-9e33-926809f15g41',
    '5c50768e-4524-4e37-9e33-926809f0dr41',
    '5c50768e-4524-4e37-9e33-926809f0b4j1'
  ),
  (
    '5c50768e-4524-4e37-9e33-926809f152v1',
    '5c50768e-4524-4e37-9e33-926809f0e941',
    '5c50768e-4524-4e37-9e33-926809f0bi81'
  );