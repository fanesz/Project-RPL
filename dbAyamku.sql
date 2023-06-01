create database dbAyamku;
drop database dbAyamku;
use dbAyamku;




CREATE TABLE IF NOT EXISTS `dbAyamku`.`detailAkun` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idAkun` char(36) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `jabatan` VARCHAR(255) NOT NULL,
  `noTelp` VARCHAR(20) NOT NULL,
  `alamat` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`), unique(idAkun), unique(email)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
insert into detailAKun (`idAkun`,`nama`,`jabatan`,`noTelp`,`alamat`,`email`) values (UUID(),'Hoho','penjual','082131948573','Jl. Beo no. 77','hoho77@gmail.com');
insert into detailAKun (`idAkun`,`nama`,`jabatan`,`noTelp`,`alamat`,`email`) values (UUID(),'Hihi','admin','053059309509','Jl. Merpati no. 456','fanes@gmail.com');
insert into detailAKun (`idAkun`,`nama`,`jabatan`,`noTelp`,`alamat`,`email`) values (UUID(),'Hehe','pelanggan','024929404304','Jl. Dara no. 788','aguss@gmail.com');
select * from detailAkun;

CREATE TABLE IF NOT EXISTS `dbAyamku`.`akun` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idAkun` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `changepwCode` varchar(100),
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`idAkun`) REFERENCES `dbAyamku`.`detailAkun` (`idAkun`),
  FOREIGN KEY (`email`) REFERENCES `dbAyamku`.`detailAkun` (`email`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
INSERT INTO akun (`idAkun`, `email`, `password`) VALUES
((select idAkun from detailAkun where email = 'hoho77@gmail.com'), 'hoho77@gmail.com', 'admin123'),
((select idAkun from detailAkun where email = 'fanes@gmail.com'), 'fanes@gmail.com', 'admin123'),
((select idAkun from detailAkun where email = 'aguss@gmail.com'), 'aguss@gmail.com', 'admin123');
select * from akun;

DELIMITER //
CREATE PROCEDURE tambahAkun(inp_email varchar(255), inp_password varchar(255), inp_jabatan varchar(255))
BEGIN
insert into detailAKun (`idAkun`,`jabatan`,`email`) values (UUID(),inp_jabatan,inp_email);
insert into akun (idAkun, email, password) values ((select idAkun from detailAkun where email = inp_email), inp_email, inp_password);
END //
DELIMITER ;


CREATE TABLE IF NOT EXISTS `dbAyamku`.`produk` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idProduk` CHAR(5) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `deskripsi` VARCHAR(255) NOT NULL,
  `berat` INT(2) NOT NULL,
  `stok` INT(11) NOT NULL,
  `harga` DECIMAL(10,2) NOT NULL,
--   `gambar` LONGBLOB,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unique (`idProduk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

select*from produk;


insert into produk (idProduk,nama,deskripsi,berat,stok,harga) values
('P0001','Bibit','Lorem Ipsum',50,40,75000),
('P0002','Makanan','Lorem Ipsum',10,41,16000),
('P0003','Bibit','Lorem Ipsum',50,42,75000),
('P0004','Makanan','Lorem Ipsum',5,43,16000),
('P0005','Makanan','Lorem Ipsum',15,44,16000);

CREATE TABLE IF NOT EXISTS `dbAyamku`.`Stock` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idProduk` CHAR(5) NOT NULL,
  `tanggal` DATE NOT NULL,
  `stokReady` INT(11) NOT NULL,
  `stokGagal` INT(11) NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `idProdukDiStok`
    FOREIGN KEY (`idProduk`)
    REFERENCES `dbAyamku`.`produk` (`idProduk`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

select*from Stock;
insert into stock (idProduk,tanggal,stokReady,stokGagal) values 
('P0001',curdate(),44,11),
('P0002',curdate(),45,8),
('P0003',curdate(),55,9),
('P0004',curdate(),56,6),
('P0005',curdate(),52,10);

-- CREATE TABLE IF NOT EXISTS `dbAyamku`.`Harga` (
--   `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
--   `idProduk` CHAR(36) NOT NULL,
--   `harga` INT(11) NOT NULL,
--   `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   CONSTRAINT `idProdukDiHarga`
--     FOREIGN KEY (`idProduk`)
--     REFERENCES `dbAyamku`.`produk` (`idProduk`)
--     ON DELETE RESTRICT
--     ON UPDATE CASCADE)
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8;

-- select*from harga;
-- insert into harga (idProduk,harga) values
-- ('P0001',60000),
-- ('P0002',78000),
-- ('P0003',90000),
-- ('P0004',10000),
-- ('P0005',65000);


CREATE TABLE IF NOT EXISTS `dbAyamku`.`Penjualan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPenjualan` CHAR(10) NOT NULL,
  `tanggal` DATE NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unique(`idPenjualan`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
INSERT INTO penjualan (`idPenjualan`, `tanggal`) VALUES
('ORD0000001', '2023/05/01'),
('ORD0000002', '2023/05/02'),
('ORD0000003', '2023/05/03'),
('ORD0000004', '2023/05/04'),
('ORD0000005', '2023/05/05');
select * from Penjualan;

select * from detailPenjualan;
CREATE TABLE IF NOT EXISTS `dbAyamku`.`detailPenjualan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPenjualan` CHAR(10) NOT NULL,
  `idAkun` CHAR(36) NOT NULL,
  `idProduk` CHAR(5) NOT NULL,
  `status` VARCHAR(15) NOT NULL,
  `jumlah` INT(11) NOT NULL,
  `totalHarga` DECIMAL(10,2) NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `idOrderDiDetailPenjualan`
    FOREIGN KEY (`idPenjualan`)
    REFERENCES `dbAyamku`.`Penjualan` (`idPenjualan`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `idAkunDiDetailPenjualan`
    FOREIGN KEY (`idAkun`)
    REFERENCES `dbAyamku`.`akun` (`idAkun`)
	ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `idProdukDiDetailPenjualan`
    FOREIGN KEY (`idProduk`)
    REFERENCES `dbAyamku`.`produk` (`idProduk`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO detailPenjualan (`idPenjualan`,`idAkun`,`idProduk`,`status`,`jumlah`,`totalHarga`) VALUES
    ('ORD0000001', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'P0001', 'Completed', 5, 10000.00),
    ('ORD0000002', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'P0002', 'Completed', 3, 15000.00),
    ('ORD0000003', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'P0003', 'Completed', 2, 8000.00),
    ('ORD0000004', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'P0004', 'Completed', 4, 12000.00),
    ('ORD0000005', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'P0005', 'Completed', 1, 9000.00);
select * from detailakun;

CREATE TABLE IF NOT EXISTS `dbAyamku`.`Pengiriman` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `idPenjualan` CHAR(10) NOT NULL,
    `idAkun` CHAR(36) NOT NULL,
    `kurir` VARCHAR(25) NOT NULL,
    `totalHarga` INT(10) NOT NULL,
    `status` VARCHAR(15) NOT NULL,
    `alamat` VARCHAR(255) NOT NULL,
    `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idPenjualan`) REFERENCES `dbAyamku`.`Penjualan` (`idPenjualan`) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (`idAkun`) REFERENCES `dbAyamku`.`detailAkun` (`idAkun`) ON DELETE RESTRICT ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
drop table Pengiriman;

INSERT INTO Pengiriman (`idPenjualan`,`idAkun`,`kurir`,`totalHarga`,`status`,`alamat`)
VALUES
    ('ORD0000001', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'JNE', 50000, 'Delivered', 'Jl. Merdeka No. 123'),
    ('ORD0000002', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'TIKI', 35000, 'In Transit', 'Jl. Jenderal Sudirman No. 456'),
    ('ORD0000003', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'Pos Indonesia', 40000, 'Shipped', 'Jl. Ahmad Yani No. 789'),
    ('ORD0000004', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'Gojek', 25000, 'Processing', 'Jl. Pahlawan No. 101'),
    ('ORD0000005', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'Grab', 30000, 'Pending', 'Jl. Gatot Subroto No. 555');
select * from Pengiriman;

CREATE TABLE IF NOT EXISTS `dbAyamku`.`Review` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `idPenjualan` CHAR(10) NOT NULL,
    `idAkun` CHAR(36) NOT NULL,
    `rating` INT(1) NOT NULL,
    `ulasan` VARCHAR(255) NOT NULL,
    `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idPenjualan`)
    REFERENCES `dbAyamku`.`Penjualan` (`idPenjualan`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (`idAkun`)
  REFERENCES `dbAyamku`.`detailAkun` (`idAkun`)
	ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO review (`idPenjualan`,`idAkun`,`rating`,`ulasan`)
VALUES
    ('ORD0000001', '08596f80-ffa8-11ed-bbc0-047c160aa273', 4, 'Great product and fast delivery!'),
    ('ORD0000002', '08596f80-ffa8-11ed-bbc0-047c160aa273', 3, 'Average quality, but good service.');
select * from review;