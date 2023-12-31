CREATE TABLE `temperaturas_tmp` (
  `id_tmp` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `temperatura1_tmp` int(11) NOT NULL,
  `temperatura2_tmp` int(11) NOT NULL,
  `temperatura3_tmp` int(11) NOT NULL,
  `timestamp_tmp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `temperaturas_tmp` (
  `id_tmp` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `temperatura1_tmp` int(11) NOT NULL,
  `temperatura2_tmp` int(11) NOT NULL,
  `temperatura3_tmp` int(11) NOT NULL,
  `fecha_tmp` varchar(10) NOT NULL,
  `hora_tmp` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `usuario` (
  `id_usua` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_usua` varchar(30) NOT NULL,
  `apellido_usua` varchar(30) NOT NULL,
  `contraseña_usua` varchar(100) NOT NULL,
  `email_usua` varchar(50) NOT NULL,
  `ci_usua` int(11) NOT NULL,
  `direccion_usua` varchar(50) NOT NULL,
  `celular_usua` int(11) NOT NULL,
  `rol_usua` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `usuario` (`id_usua`, `nombre_usua`, `apellido_usua`, `contraseña_usua`, `email_usua`, `ci_usua`, `direccion_usua`, `celular_usua`, `rol_usua`) VALUES
(1, 'Benjamin', 'Aparicio', '123', 'benjamin.aparicio@smsic.com.bo', 1236454, 'Av.arce', 76543210, 'Administrador'),
(2, 'Caleb', 'Huasco Cama', '123', 'caleb.huasco@smsic.com.bo', 6654625, 'El Alto', 76543210, 'Ingeniero'),
(3, 'Alexandro', 'Montes', '123', 'alexandro.montes@smsic.com.bo', 4568796, 'Obrajes', 76543251, 'Ingeniero'),
(4, 'Luis', 'Aparicio', '123', 'luis.aparicio@smsic.com.bo', 45986321, 'Av. Arce', 6853349, 'Administrador');



CREATE TABLE `boolean` (
  `id_bl` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `bomba1_bl` int(11) NOT NULL,
  `bomba2_bl` int(11) NOT NULL,
  `falla1_bl` int(11) NOT NULL,
  `fella2_bl` int(11) NOT NULL,
  `fecha_tmp` varchar(10) NOT NULL,
  `hora_tmp` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/***********************************************/
CREATE TABLE `demo` (
  `id_dm` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ope_dm` boolean NOT NULL,
  `bomba1_dm` boolean NOT NULL,
  `bomba2_dm` boolean NOT NULL,
  `falla1_dm` boolean NOT NULL,
  `falla2_dm` boolean NOT NULL,
  `valvula_dm` boolean NOT NULL,
  `nivel_dm` int(11) NOT NULL,
  `fecha_tmp` varchar(10) NOT NULL,
  `hora_tmp` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/**TABLA DE SEGUIMIENTO**/
CREATE TABLE `seguimiento` (
  `id_sgmt` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_sgmt` varchar(30) NOT NULL,
  `mensaje_sgmt` varchar(100) NOT NULL,
  `categoria_sgmt` varchar(11) NOT NULL,
  `fecha_sgmt` varchar(10) NOT NULL,
  `hora_sgmt` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



/****TABLA DE FALLAS *****/
CREATE TABLE `falla` (
  `id_fll` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_fll` varchar(30) NOT NULL,
  `mensaje_fll` varchar(100) NOT NULL,
  `categoria_fll` varchar(11) NOT NULL,
  `fecha_fll` varchar(10) NOT NULL,
  `hora_fll` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*******************************************************TABLAS  FINALES**************************************************/
/*-----TABLA DE VARIABLES*/
CREATE TABLE `variables` (
  `id_var` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ope_var` boolean NOT NULL,
  `bomba1_var` boolean NOT NULL,
  `bomba2_var` boolean NOT NULL,
  `falla1_var` boolean NOT NULL,
  `falla2_var` boolean NOT NULL,
  `valvula_var` boolean NOT NULL,
  `nivel_var` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `variables` (`ope_var`, `bomba1_var`, `bomba2_var`, `falla1_var`, `falla2_var`, `valvula_var`, `nivel_var`) VALUES ( false, false, false, false, false, false, 0);


/*-----TABLA DE AVISOS*/
CREATE TABLE `avisos` (
  `id_avi` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre_avi` varchar(30) NOT NULL,
  `mensaje_avi` varchar(100) NOT NULL,
  `categoria_avi` varchar(11) NOT NULL,
  `fecha_avi` date NOT NULL,
  `hora_avi` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

UPDATE branches SET start_date = '2020-10-19' WHERE id = 4;


/*Tabla para variables q se van a graficar*/


CREATE TABLE `nivel` (
  `id_nvl` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `valor_nvl` int(11) NOT NULL,
  `fecha_nvl` date NOT NULL,
  `hora_nvl` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
