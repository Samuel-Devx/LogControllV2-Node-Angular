export enum SqlQuery {
    SAVEPRODUCT="INSERT INTO product (name, price, amount, sku) VALUES (?, ?, ?, ?)",
    FINDALL="SELECT * FROM product",
    FINDBYNAME="SELECT * FROM product WHERE name LIKE ?",
    FINDBYID="SELECT * FROM product WHERE id = ?",
}