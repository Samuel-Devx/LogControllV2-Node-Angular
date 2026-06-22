<div align="center">
<img src="https://img.shields.io/badge/LogControll-V2-6C63FF?style=for-the-badge&logo=angular&logoColor=white" />
<img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-facc15?style=for-the-badge" />
<img src="https://img.shields.io/badge/Licença-MIT-60a5fa?style=for-the-badge" />
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</div>

---

# LogControll V2

> Sistema de gestão de estoque e vendas com interface moderna e backend robusto — controle seus produtos e vendas com eficiência.

---

## Sobre o Projeto

O **LogControll V2** é uma aplicação fullstack voltada para o controle de estoque e vendas. Permite cadastrar produtos, registrar vendas com múltiplos itens e acompanhar o histórico de movimentações de forma prática.

O projeto é dividido em dois módulos principais:

- **backend-node** — API REST desenvolvida em Node.js + Express + TypeScript, responsável por toda a lógica de negócio e persistência de dados.
- **frontend-angular** — Desenvolvido em Angular + PrimeNG, responsável pela interface do sistema.

---

## Funcionalidades

- Cadastro de produtos com nome, preço, estoque e SKU
- Criação de vendas com múltiplos itens
- Cálculo automático de subtotal por item e total da venda
- Validação de estoque disponível no momento da venda
- Histórico de vendas via view `vw_sale`

---

## Estrutura de Dados

A API retorna os produtos no seguinte formato:

```json
{
  "id": 1,
  "name": "Produto X",
  "price": 150,
  "account": 10,
  "sku": "PRD-001"
}
```

E as vendas:

```json
{
  "id": 1,
  "total_price": 300.00,
  "sale_date": "2025-06-22T10:00:00",
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": 150.00,
      "subtotal": 300.00
    }
  ]
}
```

---

## Banco de Dados

O projeto utiliza **MySQL / MariaDB** como banco de dados relacional.

### Criação do banco

```sql
CREATE DATABASE IF NOT EXISTS logcontrollv2
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE logcontrollv2;

CREATE TABLE product (
  id      INT(11)     NOT NULL AUTO_INCREMENT,
  name    VARCHAR(30) NOT NULL,
  price   INT(11)     NOT NULL,
  account INT(11)     NOT NULL,
  sku     VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE sale (
  id          INT(11)       NOT NULL AUTO_INCREMENT,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  sale_date   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE sale_item (
  id         INT(11)       NOT NULL AUTO_INCREMENT,
  sale_id    INT(11)       NOT NULL,
  product_id INT(11)       NOT NULL,
  quantity   INT(11)       NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal   DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sale_id)    REFERENCES sale(id)    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT
);

CREATE VIEW vw_sale AS
SELECT
  s.id AS sale_id, s.sale_date, s.total_price,
  p.name, si.quantity, si.unit_price
FROM sale s
JOIN sale_item si ON si.sale_id = s.id
JOIN product   p  ON p.id = si.product_id;
```

Ou execute o script disponível na raiz do projeto:

```bash
mysql -u root -p < logcontrollv2_database.sql
```

### Configuração da conexão

Crie um arquivo `.env` na pasta `backend-node`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=logcontrollv2
PORT=3000
```

---

## Como Rodar

### Pré-requisitos

- Node.js 18+
- MySQL ou MariaDB rodando localmente
- Angular CLI (`npm install -g @angular/cli`)

### Backend

```bash
cd backend-node
npm install
npm run dev
```

A API sobe em `http://localhost:3000`.

### Frontend

```bash
cd frontend-angular
npm install
ng serve
```

Acesse em `http://localhost:4200`.

---

<p align="center">
  Feito por <a href="https://github.com/Samuel-Devx">Samuel-Dev</a>
</p>
