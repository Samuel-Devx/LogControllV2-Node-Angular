export enum SqlQuery {
    SAVEPRODUCT="INSERT INTO product (name, price , account, sku) VALUES (?, ?, ?, ?)",
    FINDALL="SELECT * FROM product",
    FINDBYNAME="SELECT * FROM product WHERE name LIKE ?",
    DELETEBYID="DELETE FROM product WHERE id = ?",
    FINDBYID="SELECT * FROM product WHERE id = ?",
    UPDATEBYID="UPDATE product SET name = ?, price = ?, account = ?, sku = ? WHERE id = ?",
    INSERTITEM="INSERT INTO sale_item (sale_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)",
    INSERTSALE="INSERT INTO sale (total_price, sale_date) VALUES (?, NOW())",
    UPDATESTOQUE="UPDATE product SET account = account - ? WHERE id = ?",
    
}