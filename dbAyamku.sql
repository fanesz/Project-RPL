drop database if exists dbAyamku;
create database dbAyamku;
use dbAyamku;

select * from pesanan;

CREATE TABLE IF NOT EXISTS `dbAyamku`.`detailAkun` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idAkun` char(36) NOT NULL,
  `nama` VARCHAR(255),
  `noTelp` VARCHAR(20),
  `email` VARCHAR(255) NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`), unique(idAkun), unique(email)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dbAyamku`.`alamat` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idAkun` CHAR(36) NOT NULL,
  `penerima` varchar(255),
  `noTelp` varchar(20),
  `jalan` varchar(255),
  `kodePos` varchar(10),
  `rtrw` varchar(10),
  `kelurahan` varchar(255),
  `kecamatan` varchar(255),
  `kota` varchar(255),
  `provinsi` varchar(255),
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `idAkunDiAlamat`
    FOREIGN KEY (`idAkun`)
    REFERENCES `dbAyamku`.`detailAkun` (`idAkun`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `dbAyamku`.`akun` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idAkun` CHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `akses` VARCHAR(255) NOT NULL,
  `changepwCode` varchar(100),
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`idAkun`) REFERENCES `dbAyamku`.`detailAkun` (`idAkun`),
  FOREIGN KEY (`email`) REFERENCES `dbAyamku`.`detailAkun` (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DELIMITER //
CREATE PROCEDURE tambahAkun(inp_email varchar(255), inp_password varchar(255), inp_akses varchar(255))
BEGIN
declare generateIdAkun char(36);
set generateIdAkun = UUID();
insert into detailAKun (`idAkun`,`email`) values (generateIdAkun,inp_email);
insert into akun (idAkun, email, password, akses) values (generateIdAkun, inp_email, inp_password, inp_akses);
insert into alamat (idAkun) values (generateIdAkun);
END //
DELIMITER ;

call tambahAkun("pratama14.f@gmail.com", 'admin123', 'admin');
call tambahAkun("fanes23.pratama@gmail.com", 'seller123', 'seller');
call tambahAkun("fanes23.pratama@mhs.mdp.ac.id", 'user123', 'user');

CREATE TABLE IF NOT EXISTS `dbAyamku`.`produk` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idProduk` CHAR(5) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `deskripsi` VARCHAR(255) NOT NULL,
  `berat` INT(2) NOT NULL,
  `stok` INT(11) NOT NULL,
  `harga` DECIMAL(10,2) NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unique (`idProduk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
insert into produk (idProduk,nama,deskripsi,berat,stok,harga) values
('P0001','Bibit Ayam','Bibit Ayam yang masih berumur 5-7 hari dengan kondisi yang sehat!',50,1000,5000),
('P0002','Pakan Ayam','Pakan Ayam berprotein tinggi sehingga pertumbuhan ayam jadi cepat!',10000,300,16000),
('P0003','Ayam Petelur','Ayam berumur 4-5 bulan yang sudah bisa menghasilkan telur-telur berkualitas!',1500,40,60000),
('P0004','Telur','Telur-telur segar dari ayam petelur!',5,1200,2000);


CREATE TABLE IF NOT EXISTS `dbAyamku`.`rekening` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idRekening` char(5) NOT NULL,
  `bank` VARCHAR(255) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `nomor` VARCHAR(255) NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(`idRekening`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
insert into rekening (idRekening, bank, nama, nomor) values
("R0001", 'BCA', 'PT Ayamku', '01234567'),
("R0002", 'Mandiri', 'PT Ayamku', '23456789'),
("R0003", 'BRI', 'PT Ayamku', '01234567');


CREATE TABLE IF NOT EXISTS `dbAyamku`.`pesanan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPesanan` CHAR(10) NOT NULL,
  `idAkun` CHAR(36) NOT NULL,
  `jumlahJenisBarang` int NOT NULL,
  `total` DOUBLE NOT NULL,
  `status` VARCHAR(15) NOT NULL,
  `waktuPesan` TIMESTAMP NOT NULL,
  `idRekening` CHAR(5) NOT NULL,
  `atasNama` VARCHAR(255) NOT NULL,
  `alamat` JSON,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unique(`idPesanan`),
  CONSTRAINT `idAkunDiDetailPenjualan`
  FOREIGN KEY (`idAkun`)
  REFERENCES `dbAyamku`.`akun` (`idAkun`),
  CONSTRAINT `idRekeningDiPesanan`
  FOREIGN KEY (`idRekening`)
  REFERENCES `dbAyamku`.`rekening` (`idRekening`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dbAyamku`.`detailPesanan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPesanan` CHAR(10) NOT NULL,
  `idProduk` CHAR(5) NOT NULL,
  `jumlah` INT(11) NOT NULL,
  `harga` DOUBLE NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `idOrderDiDetailPenjualan`
    FOREIGN KEY (`idPesanan`)
    REFERENCES `dbAyamku`.`pesanan` (`idPesanan`),
  CONSTRAINT `idProdukDiDetailPesanan`
    FOREIGN KEY (`idProduk`)
    REFERENCES `dbAyamku`.`produk` (`idProduk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

DELIMITER //
CREATE TRIGGER reduce_stock AFTER INSERT ON detailPesanan FOR EACH ROW
BEGIN
    UPDATE produk SET stok = stok - NEW.jumlah WHERE idProduk = NEW.idProduk;
END//
DELIMITER ;

