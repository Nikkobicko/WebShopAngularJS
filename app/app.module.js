angular.module("app", ["ui.bootstrap", "ngRoute", "category", "product",
    "cart", "login", "productdetails", "user", "orderdetails", "newUser"])
    .constant('myUrl',{
        'key1': "http://167.99.222.177:8080/webshop9-0.0.1-SNAPSHOT",
       /* 'key1': "http://localhost:8080/webshop9",*/

           } );
