import React from "react";

class Basket extends React.Component {
  state = {
    total: 0
  };

  render() {
    return (
      <div
        className="basket"
        style={
          this.props.meals.length <= 0
            ? { alignItems: "center" }
            : { alignItems: "" }
        }
      >
        <button
          className="valider"
          style={
            this.props.meals.length <= 0
              ? { backgroundColor: "" }
              : { backgroundColor: "#33D6C9", color: "white" }
          }
        >
          Valider mon panier
        </button>
        <p
          className="panier"
          style={
            this.props.meals.length <= 0 ? { display: "" } : { display: "none" }
          }
        >
          Votre panier est vide
        </p>
        {this.props.meals.map((meal, index) => {
          return (
            <>
              <div className="menuLine" key={index}>
                {this.props.under(index)}
                <span>
                  {" "}
                  <i
                    onClick={() => {
                      this.props.majQuantityclick(index, "-");
                    }}
                    class="fas fa-minus"
                  />
                </span>{" "}
                <span>{meal.quantity} </span>{" "}
                <span>
                  {" "}
                  <i
                    onClick={() => {
                      this.props.majQuantityclick(index, "+");
                    }}
                    className="fas fa-plus"
                  />{" "}
                </span>
                <span>
                  {meal.name.length > 20
                    ? meal.name.slice(0, 20) + "..."
                    : meal.name}{" "}
                </span>
                <span style={{ marginBlock: 100 }}>{meal.montant + " €"}</span>
              </div>
            </>
          );
        })}
        <div
          className="allprice"
          style={
            this.props.soustt <= 0
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
        >
          <div
            className="sous-total"
            style={{
              height: 1,
              width: "90%",
              marginLeft: 15,
              marginBottom: 30,
              backgroundColor: "#ada8a8"
            }}
          />
          <span style={{ color: "grey" }}>Sous-total</span>{" "}
          <span style={{ marginLeft: 175 }}>
            {this.props.soustt.toFixed(2) + " €"}
          </span>
          <div>
            <span style={{ fontWeight: "600" }}>Frais de livraison</span>{" "}
            <span style={{ marginLeft: 130 }}>2.54 €</span>
          </div>
          <div
            style={{
              height: 1,
              width: "90%",
              marginLeft: 15,
              marginBottom: 30,
              marginTop: 30,
              backgroundColor: "#ada8a8"
            }}
          />
          <span style={{ fontWeight: "600" }}>Total</span>{" "}
          <span style={{ fontWeight: "600", marginLeft: 210 }}>
            {(this.props.soustt + 2.54).toFixed(2) + " €"}
          </span>
        </div>
      </div>
    );
  }
}

export default Basket;
