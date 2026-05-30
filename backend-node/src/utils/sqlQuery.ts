export enum SqlQuery {
    SAVEPRODUCT="INSERT INTO product (name, price , account, sku) VALUES (?, ?, ?, ?)",
    FINDALL="SELECT * FROM product",
    FINDBYNAME="SELECT * FROM product WHERE name LIKE ?",
    DELETEBYID="DELETE FROM product WHERE id = ?",
    FINDBYID="SELECT * FROM product WHERE id = ?",
}