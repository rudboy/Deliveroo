import React from "react";

class Meal extends React.Component {
  render() {
    //recuperer le dernier espace
    let toto = this.props.description.lastIndexOf(" ", 57);
    //supprimer les caractere apres l'espace
    let tata = this.props.description.substr(0, toto);
    return (
      <div
        onClick={() => {
          this.props.addMeal({
            name: this.props.title,
            quantity: 1,
            price: Number(this.props.price),
            montant: Number(this.props.price)
          });
        }}
        className="meal"
      >
        <div className="colone col-xs-12">
          <div>
            <li className="title">{this.props.title}</li>
            <li className="description">{tata + "..."}</li>
            <li className="price">{this.props.price + " €"}</li>
          </div>
          <div
            style={
              this.props.picture === undefined
                ? { display: "none" }
                : { display: "" }
            }
          >
            <img className="image3" src={this.props.picture} />
          </div>
        </div>
      </div>
    );
  }
}

export default Meal;
