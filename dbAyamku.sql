create database dbAyamku;
drop database dbAyamku;
use dbAyamku;


CREATE TABLE IF NOT EXISTS `dbAyamku`.`detailAkun` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idAkun` char(36) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `noTelp` VARCHAR(20) NOT NULL,
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
  `penerima` varchar(255) NOT NULL,
  `noTelp` varchar(20) NOT NULL,
  `jalan` varchar(255) NOT NULL,
  `kodePos` varchar(10) NOT NULL,
  `rtrw` varchar(10) NOT NULL,
  `kelurahan` varchar(255) NOT NULL,
  `kecamatan` varchar(255) NOT NULL,
  `kota` varchar(255) NOT NULL,
  `provinsi` varchar(255) NOT NULL,
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
  FOREIGN KEY (`email`) REFERENCES `dbAyamku`.`detailAkun` (`email`)
)
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

select*from produk;

select stok from produk where idProduk = 'P0001' ;

insert into produk (idProduk,nama,deskripsi,berat,stok,harga) values
('P0001','Bibit Ayam','Bibit Ayam yang masih berumur 5-7 hari dengan kondisi yang sehat!',50,1000,5000),
('P0002','Pakan Ayam','Pakan Ayam berprotein tinggi sehingga pertumbuhan ayam jadi cepat!',10000,300,16000),
('P0003','Ayam Petelur','Ayam berumur 4-5 bulan yang sudah bisa menghasilkan telur-telur berkualitas!',1500,40,60000),
('P0004','Telur','Telur-telur segar dari ayam petelur!',5,1200,50);


select * from detailakun;

SELECT pesanan.idPesanan, detailAkun.nama, pesanan.alamat, detailAkun.email, detailAkun.noTelp, pesanan.waktuPesan, pesanan.status, detailPesanan.idProduk, produk.nama as namaProduk, detailPesanan.harga, detailPesanan.jumlah, pesanan.jumlahJenisBarang, rekening.bank, pesanan.atasNama FROM detailpesanan, pesanan, detailAkun, produk, rekening WHERE pesanan.idPesanan = detailpesanan.idPesanan and pesanan.idAkun = detailAkun.idAkun AND pesanan.idRekening = rekening.idRekening AND detailPesanan.idProduk = produk.idProduk AND pesanan.idAkun = '${req.params.id}';

select * from akun;
select * from pesanan;
select * from detailpesanan;

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

drop table detailpesanan;
drop table pesanan;
insert into pesanan(idPesanan, idAkun, idRekening) values('PAA0000001', 'fcbae759-039e-11ee-8f7d-047c160aa273', 'R0001');
select * from akun;

SELECT coalesce(SUM(jumlah), 0) as terjual FROM detailPesanan WHERE idProduk = 'P0001';

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


CREATE TABLE IF NOT EXISTS `dbAyamku`.`rekening` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idRekening` char(5) NOT NULL,
  `bank` VARCHAR(255) NOT NULL,
  `nama` VARCHAR(255) NOT NULL,
  `nomor` VARCHAR(255) NOT NULL,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE(`idRekening`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

insert into rekening (idRekening, bank, nama, nomor) values("R0001", 'BCA', 'PT Ayamku', '01234567');
insert into rekening (idRekening, bank, nama, nomor) values("R0002", 'Mandiri', 'PT Ayamku', '23456789');
insert into rekening (idRekening, bank, nama, nomor) values("R0003", 'BRI', 'PT Ayamku', '01234567');

drop table rekening;


-- CREATE TABLE IF NOT EXISTS `dbAyamku`.`Pengiriman` (
--     `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
--     `idPenjualan` CHAR(10) NOT NULL,
--     `idAkun` CHAR(36) NOT NULL,
--     `kurir` VARCHAR(25) NOT NULL,
--     `totalHarga` INT(10) NOT NULL,
--     `status` VARCHAR(15) NOT NULL,
--     `alamat` VARCHAR(255) NOT NULL,
--     `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`),
--     FOREIGN KEY (`idPenjualan`) REFERENCES `dbAyamku`.`Penjualan` (`idPenjualan`) ON DELETE RESTRICT ON UPDATE CASCADE,
--     FOREIGN KEY (`idAkun`) REFERENCES `dbAyamku`.`detailAkun` (`idAkun`) ON DELETE RESTRICT ON UPDATE CASCADE
-- )
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8;
-- drop table Pengiriman;

-- INSERT INTO Pengiriman (`idPenjualan`,`idAkun`,`kurir`,`totalHarga`,`status`,`alamat`)
-- VALUES
--     ('ORD0000001', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'JNE', 50000, 'Delivered', 'Jl. Merdeka No. 123'),
--     ('ORD0000002', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'TIKI', 35000, 'In Transit', 'Jl. Jenderal Sudirman No. 456'),
--     ('ORD0000003', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'Pos Indonesia', 40000, 'Shipped', 'Jl. Ahmad Yani No. 789'),
--     ('ORD0000004', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'Gojek', 25000, 'Processing', 'Jl. Pahlawan No. 101'),
--     ('ORD0000005', '08596f80-ffa8-11ed-bbc0-047c160aa273', 'Grab', 30000, 'Pending', 'Jl. Gatot Subroto No. 555');
-- select * from Pengiriman;

-- CREATE TABLE IF NOT EXISTS `dbAyamku`.`Review` (
-- 	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
--     `idPenjualan` CHAR(10) NOT NULL,
--     `idAkun` CHAR(36) NOT NULL,
--     `rating` INT(1) NOT NULL,
--     `ulasan` VARCHAR(255) NOT NULL,
--     `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- 	`updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`),
--     FOREIGN KEY (`idPenjualan`)
--     REFERENCES `dbAyamku`.`Penjualan` (`idPenjualan`)
--     ON DELETE RESTRICT
--     ON UPDATE CASCADE,
--   FOREIGN KEY (`idAkun`)
--   REFERENCES `dbAyamku`.`detailAkun` (`idAkun`)
-- 	ON DELETE RESTRICT
--     ON UPDATE CASCADE)
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8;

-- INSERT INTO review (`idPenjualan`,`idAkun`,`rating`,`ulasan`)
-- VALUES
--     ('ORD0000001', '08596f80-ffa8-11ed-bbc0-047c160aa273', 4, 'Great product and fast delivery!'),
--     ('ORD0000002', '08596f80-ffa8-11ed-bbc0-047c160aa273', 3, 'Average quality, but good service.');
-- select * from review;