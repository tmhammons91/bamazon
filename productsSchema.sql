
//various commands used in the Schema for the products table 

use bamazon; 

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL, 
price DECIMAL(10, 2), 
stock_quantity INTEGER (5), 
PRIMARY KEY(item_id)
);

use bamazon; 

insert into products (product_name, department_name, price, stock_quantity)
values 
("Sparklers, Original", "Fireworks", 1.00, 40), 
("Sparklers, Large", "Fireworks", 5.00, 25), 
("Firecrackers", "Fireworks", 2.50, 50), 
("Lighter Sticks", "Accessories", 1.00, 75), 
("Balloons, Multicolored", "Decorations", 3.25, 75), 
("Fire Extinguisher", "Accessories", 25.00, 15), 
("Bottle Rockets", "Fireworks", 2.00, 45), 
("Bling Bling Multishot", "Fireworks", 38.00, 5), 
("Streamers", "Decorations", 4.00, 20), 
("Fuse", "Accessories", 3.50, 18); 


select item_id, stock_quantity from products WHERE item_id = 103

; 
use bamazon; 
select * from products; 

UPDATE products SET stock_quantity = 50  where item_id = 103; 
UPDATE products SET stock_quantity = 60  where item_id = 104; 
UPDATE products SET stock_quantity = 10  where item_id = 105; 
UPDATE products SET stock_quantity = 50  where item_id = 106; 
