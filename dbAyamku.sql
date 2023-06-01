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
  `gambar` LONGBLOB,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unique (`idProduk`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

select*from produk;
insert into produk (idProduk,nama,deskripsi,berat,stok,harga,gambar) values
('P0001','Bibit','Lorem Ipsum',50,40,75000,'ayam.jpg'),
('P0002','Makanan','Lorem Ipsum',10,0,16000,'makanan.jpg'),
('P0003','Bibit','Lorem Ipsum',50,7,75000,'ayam.jpg'),
('P0004','Bibit','Lorem Ipsum',15,10,13000,'ayam.jpg'),
('P0005','Makanan','Lorem Ipsum',5,43,16000,'makanan.jpg'),
('P0006','Makanan','Lorem Ipsum',15,9,13000,'makanan.jpg'),
('P0007','Makanan','Lorem Ipsum',15,-1,16000,'makanan.jpg');

CREATE TABLE IF NOT EXISTS `dbAyamku`.`stok` (
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

select*from stok;
insert into stok (idProduk,tanggal,stokReady,stokGagal) values 
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

CREATE TABLE IF NOT EXISTS `dbAyamku`.`penjualan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPenjualan` CHAR(10) NOT NULL,
  `idAkun` CHAR(36) NOT NULL,
  `tanggal` DATE NOT NULL,
  CONSTRAINT `idAkunDiDetailPenjualan`
    FOREIGN KEY (`idAkun`)
    REFERENCES `dbAyamku`.`akun` (`idAkun`)
	ON DELETE RESTRICT
    ON UPDATE CASCADE,
  `createdat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedat` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unique(`idPenjualan`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
INSERT INTO penjualan (`idPenjualan`,`idAkun`, `tanggal`) VALUES
('ORD0000001', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), '2023/05/01'),
('ORD0000002', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), '2023/05/25'),
('ORD0000003', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), '2023/05/31'),
('ORD0000004', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), '2023/05/24'),
('ORD0000005', (select idAkun from detailAkun where email = 'hoho77@gmail.com'),'2023/05/05');
select * from penjualan;

select * from detailPenjualan;
CREATE TABLE IF NOT EXISTS `dbAyamku`.`detailPenjualan` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPenjualan` CHAR(10) NOT NULL,
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
  CONSTRAINT `idProdukDiDetailPenjualan`
    FOREIGN KEY (`idProduk`)
    REFERENCES `dbAyamku`.`produk` (`idProduk`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO detailPenjualan (`idPenjualan`,`idProduk`,`status`,`jumlah`,`totalHarga`) VALUES
    ('ORD0000001', 'P0001', 'Completed', 5, 10000.00),
    ('ORD0000002', 'P0002', 'Completed', 3, 15000.00),
    ('ORD0000003', 'P0003', 'Completed', 2, 8000.00),
    ('ORD0000004', 'P0004', 'Completed', 4, 12000.00),
    ('ORD0000005', 'P0005', 'Completed', 1, 9000.00);
select * from detailPenjualan;

CREATE TABLE IF NOT EXISTS `dbAyamku`.`pengiriman` (
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

INSERT INTO pengiriman (`idPenjualan`,`idAkun`,`kurir`,`totalHarga`,`status`,`alamat`)
VALUES
    ('ORD0000001', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), 'JNE', 50000, 'Delivered', 'Jl. Merdeka No. 123'),
    ('ORD0000002', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), 'TIKI', 35000, 'In Transit', 'Jl. Jenderal Sudirman No. 456'),
    ('ORD0000003', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), 'Pos Indonesia', 40000, 'Shipped', 'Jl. Ahmad Yani No. 789'),
    ('ORD0000004', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), 'Gojek', 25000, 'Processing', 'Jl. Pahlawan No. 101'),
    ('ORD0000005', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), 'Grab', 30000, 'Pending', 'Jl. Gatot Subroto No. 555');
select * from pengiriman;

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
    ('ORD0000001', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), 4, 'Great product and fast delivery!'),
    ('ORD0000002', (select idAkun from detailAkun where email = 'hoho77@gmail.com'), 3, 'Average quality, but good service.');
select * from review;

SELECT
    ROW_NUMBER() OVER (ORDER BY tanggal) AS id,
    tanggal,
    COUNT(*) AS total_penjualan,
    SUM(omset) AS omset
FROM (
	SELECT
		tanggal,
		COUNT(*) AS omset FROM Penjualan
        WHERE tanggal >= CURDATE() - INTERVAL 7 DAY
        GROUP BY tanggal
    ) AS subquery
GROUP BY tanggal
ORDER BY tanggal;

SELECT
    dp.id,
    da.nama AS nama_pembeli,
    pr.nama AS nama_produk,
    dp.jumlah
FROM
    detailPenjualan dp
    INNER JOIN detailAkun da ON dp.idAkun = da.idAkun
    INNER JOIN produk pr ON dp.idProduk = pr.idProduk
ORDER BY
    dp.created_at DESC
LIMIT 10;

-- omset bulan ini
select*from penjualan;
select*from detailpenjualan;
delimiter <>
create or replace procedure omsetBulanIni(bulan int,tahun int)
begin
declare omset decimal(10,2);
set omset=(select sum(jumlah*totalHarga) from penjualan,detailPenjualan where 
detailPenjualan.idPenjualan=penjualan.idPenjualan and month(tanggal)=bulan and year(tanggal)=tahun);
select bulan as `Bulan`, tahun as `Tahun`, coalesce(omset,'-') as `totalOmset`;
end <>
delimiter ;
call omsetBulanIni(5,2023);

-- tampil produk sekarat
select*from produk;
delimiter <>
create or replace procedure cekStokSekarat()
begin
declare `status` varchar(255);
select id, idProduk, stok, (select if(stok<0,'Negatif',if(stok=0,'Habis','Hampir Habis'))) from produk where stok<10;
end <>
delimiter ;
call cekStokSekarat();
select stok,if(stok<10,'Hampir Habis',if(stok=0,'Habis','Negatif')) from produk;