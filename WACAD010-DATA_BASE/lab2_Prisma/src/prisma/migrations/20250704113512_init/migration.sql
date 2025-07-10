/*
  Warnings:

  - You are about to alter the column `desconto_aplicado` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `Decimal(65,30)`.
  - You are about to alter the column `total` on the `Compra` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(65,30)`.
  - You are about to alter the column `preco_unitario` on the `ItemCompra` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(65,30)`.
  - You are about to alter the column `preco_base` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(65,30)`.
  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Compra` DROP FOREIGN KEY `Compra_id_endereco_envio_fkey`;

-- DropForeignKey
ALTER TABLE `Endereco` DROP FOREIGN KEY `Endereco_id_cliente_fkey`;

-- DropIndex
DROP INDEX `Compra_id_endereco_envio_fkey` ON `Compra`;

-- AlterTable
ALTER TABLE `Compra` MODIFY `desconto_aplicado` DECIMAL(65, 30) NULL,
    MODIFY `total` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `ItemCompra` MODIFY `preco_unitario` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `Produto` MODIFY `preco_base` DECIMAL(65, 30) NOT NULL;

-- DropTable
DROP TABLE `Endereco`;

-- CreateTable
CREATE TABLE `ENDERECO` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `logradouro` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ENDERECO` ADD CONSTRAINT `ENDERECO_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_endereco_envio_fkey` FOREIGN KEY (`id_endereco_envio`) REFERENCES `ENDERECO`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;
