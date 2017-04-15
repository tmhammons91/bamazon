var mysql = require("mysql");
var inquirer = require("inquirer");

var chosenItem;

//Connect to the database ======================================
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    // console.log("successful connection to db")
});

//FUNCTIONS================================================================================
//Main process/starting function
function showItems() {
    console.log("-------------------------\nWelcome to BAM!azon, the Fireworks Superstore. \nBrowse our selection of fireworks and supplies below. \n")
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            var itemID = results[i].item_id;
            var productName = results[i].product_name;
            var productPrice = results[i].price.toFixed(2);
            console.log("Item ID: " + itemID + "  |  Price: $" + productPrice + "  --  Product: " + productName);
        }
        chooseItem();
    })
};

//Choose item function
function chooseItem() {
    inquirer.prompt([
        {
            name: "itemChoice",
            type: "input",
            message: "Enter the item number of the item you would like to purchase:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } return false;
            }
        }]).then(function (answer) {
            var choiceMade = parseInt(answer.itemChoice);
            var itemIdList = [];
            connection.query("SELECT item_id FROM products", function (err, results) {
                for (var i = 0; i < results.length; i++) {
                    itemIdList.push(results[i].item_id)
                };

                if (itemIdList.indexOf(choiceMade) != -1) {
                    chosenItem = choiceMade;
                    console.log("chosen ID is: " + chosenItem);
                    buyItem();
                } else {
                    console.log("Item ID not found. Try another");
                    chooseItem();
                }
            })
        });
};

//function to buy items
function buyItem() {
    connection.query("SELECT item_id, stock_quantity, price FROM products WHERE item_id = ?",
        chosenItem, function (err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } return false;
                    }
                }
            ]).then(function (answer) {
                var quantityReq = parseInt(answer.quantity);
                var stockQuantity = results[0].stock_quantity;
                stockQuantity = parseInt(stockQuantity);

                if (quantityReq > stockQuantity) {
                    console.log("Not enough in stock. Enter "
                        + stockQuantity + " or fewer");
                    buyItem();
                } else {
                    stockQuantity = stockQuantity - quantityReq;
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                        [stockQuantity, chosenItem], function (err, res) { });
                    var price = results[0].price;
                    price = parseFloat(price).toFixed(2);
                    var totalPrice = quantityReq * price;
                    totalPrice=parseFloat(totalPrice).toFixed(2); 
                    console.log("Purchase successful.");
                    console.log("Total price is: $" + totalPrice);
                    inquirer.prompt([
                        {
                            name: "action",
                            type: "list",
                            message: "Would you like to browse and buy more products?",
                            choices: ["Yes", "No"]
                        }
                    ]).then(function (answer) {
                        if (answer.action === "Yes") {
                            showItems()
                        } else if (answer.action === "No") {
                            console.log("Thank you for visiting BAM!azon.  Bye Bye")
                        }
                    })
                }
            })
        })
}

//Calling the main process/starting function ===================
showItems();

