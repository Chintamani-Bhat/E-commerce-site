import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {
// here we are adding the products in the home page which is stored in the form of json file
    state = {
        products: [
            {
                "_id": "1",
                "title": "Zoom Freak2 01",
                "src": "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
                "description": "Best product for sports and casuals",
                "content": "Giannis possesses a freakish combination of height, length and speed rarely seen in the league. The Zoom Freak 2 harnesses his power and helps enable him to generate force to help drive him down the court. A moulded overlay caps the outer toe area to help contain Giannis's devastating Euro step move.",
                "price": 2359,
                "colors":["red","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": " AirForce NDESTRUKT 02",
                "src": "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
                "description": "Best product for sports and casuals",
                "content": "Giannis possesses a freakish combination of height, length and speed rarely seen in the league. Nike Air Force 1 NDESTRUKT harnesses his power and helps enable him to generate force to help drive him down the court. A moulded overlay caps the outer toe area to help contain Giannis's devastating Euro step move.",
                "price": 3299,
                "colors":["red","crimson","teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "AirMax Zephyr 03",
                "src": "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
                "description": "Best product for sports and casuals",
                "content": "Otherworldly comfort meets cutting-edge innovation as greatest invention arrives at a new place. With its futuristic look and feel, the Air Max Zephyr now brings the soft cushioning of visible Air to the upper while also keeping wind beneath your feet. The sleek, athletics-inspired silhouette includes durable no-sew skins and airy tactile mesh for a contemporary look while its plush padded collar liberates every step.",
                "price": 5099,
                "colors":["lightblue","white","crimson","teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Jordan Delta 04",
                "src": "https://www.upsieutoc.com/images/2020/06/27/img4.jpg",
                "description": "Best product for sports and casuals",
                "content": "The Jordan Delta is a versatile shoe that's comfortable from the inside out. Mixing high-tech and premium materials, it's plush, lightweight and crafted with an array of details.",
                "price": 3500,
                "colors":["orange","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Kyrie 7EP 'Sisterhood' 05",
                "src": "https://www.upsieutoc.com/images/2020/06/27/img5.jpg",
                "description": "Best product for sports and casuals",
                "content": "Kyrie made headlines with his generous, outspoken support of female ballers. Nike is joining him with the special 'Sisterhood' colourway of the Kyrie 7 EP, which aims to empower and unify support for women athletes everywhere. The eye-grabbing aesthetic is highlighted by a detailed floral graphic underneath the pop of its yellow-outlined Swoosh logo. On or off the court, show your support for women athletes in style. This EP version uses an extra-durable outsole that's ideal for outdoor courts.",
                "price": 2999,
                "colors":["orange","black","crimson","teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": " Flip Flops 06",
                "src": "https://www.upsieutoc.com/images/2020/06/27/img6.jpg",
                "description": "Best product for sports and casuals",
                "content": "Giannis possesses a freakish combination of height, length and speed rarely seen in the league. The  Flip Flops harnesses his power and helps enable him to generate force to help drive him down the court. A moulded overlay caps the outer toe area to help contain Giannis's devastating Euro step move.",
                "price": 1200,
                "colors":["orange","black","crimson","teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };
// adding the products into the cart 
    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };
// reducing the products the cart 
    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };
// increasing the quantity of the products
    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };
// removing the products from the cart
    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };
// here we are calculating the total amount of the products in the cart
    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
// here we are storing the data  in the local storage
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   
// here we call all the functions 
    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


