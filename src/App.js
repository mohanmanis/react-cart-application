import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
    }
    addProductToCart = (id) => {
        this.updateQuantity(id, 1)
    }
    
    removeProductFromCart = (id) => {
        this.updateQuantity(id, -1)
    }

    changeTheQuantity = (id, newValue) => {
        if (Number.isInteger(newValue) && newValue > -1) {
            const oldValue = this.state.products.forEach(item => item.id === id).cartQuantity;
            this.updateQuantity(id, newValue - oldValue)
        }
    }

    updateQuantity = (id, amount) => {
        this.setState(function ({ cart, products }) {
            products.forEach((product, index) => {
                if (product.id === id) {
                    products[index].cartQuantity += amount;
                    let found = false;
                    cart.items.forEach((item, itemIndex) => {
                        if (item.id === id) {
                            found = true;
                            if (product.cartQuantity === 0) {
                                cart.items.splice(itemIndex,1)
                            } else {
                                cart.items[itemIndex].quantity = product.cartQuantity
                            }
                        }
                    })
                    if (!found) {
                        cart.items.push({ id: product.id, item: product.name, quantity: product.cartQuantity })
                    }
                }
            })
            return {
                cart,
                products
            }
        })
    }
    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} addProductToCart={this.addProductToCart} removeProductFromCart={this.removeProductFromCart} changeTheQuantity={ this.changeTheQuantity}/>
                    <Cart cart={this.state.cart}/>
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
