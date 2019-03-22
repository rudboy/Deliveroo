import React, { Component } from "react";
import Header from "./components/Header";
import Basket from "./components/Basket";
import Menu from "./components/Menu";
import axios from "axios";

import "./App.css";

// 1) Les états
// 2) UI
// 3) Interactions

class App extends Component {
  state = {
    restaurant: {},
    menu: {},
    error: false,
    basket: [],
    sousTotal: 0
  };
  renderError = () => {
    if (this.state.error === true) {
      return <div>Une erreur est survenue</div>;
    }
    return null;
  };
  addMeal = meal => {
    console.log(meal);
    const newBasket = [...this.state.basket];
    if (this.state.basket.length > 0) {
      for (let i = 0; i <= newBasket.length - 1; i++) {
        if (newBasket[i].name === meal.name) {
          this.majQuantityclick(i, "+");
          return true;
        }
      }
    }
    newBasket.push(meal);

    this.setState(
      {
        basket: newBasket
      },
      () => {
        this.caLsousTotal();
      }
    );
  };
  majQuantityclick = (index, ope) => {
    let newQuant;
    newQuant = [...this.state.basket];
    if (ope === "+") {
      newQuant[index].quantity = newQuant[index].quantity + 1;
    } else {
      newQuant[index].quantity = newQuant[index].quantity - 1;
    }
    //console.log(newQuant[index]);
    this.setState({ basket: newQuant });
    newQuant = [...this.state.basket];
    newQuant[index].montant = newQuant[index].quantity * newQuant[index].price;
    this.setState({ basket: newQuant });
    this.caLsousTotal();
  };
  caLsousTotal = () => {
    let newSoustotal = 0;
    for (let i = 0; i < this.state.basket.length; i++) {
      newSoustotal = newSoustotal + this.state.basket[i].montant;
    }
    this.setState({ sousTotal: newSoustotal });
  };
  Underzero = index => {
    if (this.state.basket[index].quantity <= 0) {
      let newBasket = [...this.state.basket];
      newBasket.splice(index, 1);
      this.setState({ basket: newBasket });
    }
  };

  // (1), (3)
  render() {
    return (
      <div className="full">
        <Header />
        {this.renderError()}
        <div className="row">
          <div className="wrapper">
            <div className="row">
              <div className="col-8">
                <h1>{this.state.restaurant.name}</h1>
                <p>{this.state.restaurant.description}</p>
              </div>
              <div className="col-4">
                <img className="image2" src={this.state.restaurant.picture} />
              </div>
            </div>
          </div>
        </div>

        <div className="page-content wrapper">
          <Menu addMeal={this.addMeal} data={this.state.menu} />
          <Basket
            meals={this.state.basket}
            majQuantityclick={this.majQuantityclick}
            soustt={this.state.sousTotal}
            under={this.Underzero}
          />
        </div>
      </div>
    );
  }
  // (2)
  async componentDidMount() {
    try {
      const response = await axios.get("https://deliveroo-api.now.sh/menu");
      // Va déclencher un nouveau render
      this.setState({
        restaurant: response.data.restaurant,
        menu: response.data.menu
      });
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }
}

export default App;
