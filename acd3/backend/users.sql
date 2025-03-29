CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE empleados (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    documento VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    cargo VARCHAR(50),
    sueldo DECIMAL(10, 2)
);

CREATE TABLE salarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_pago VARCHAR(50) NOT NULL,    
    mes VARCHAR(20) NOT NULL,         
    ano INT NOT NULL,                  
    documento VARCHAR(20) NOT NULL,
    sueldo_base DECIMAL(10, 2) NOT NULL,
    bonos DECIMAL(10, 2) DEFAULT 0,
    deducciones DECIMAL(10, 2) DEFAULT 0,
    iva DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (documento) REFERENCES empleados(documento)
);
