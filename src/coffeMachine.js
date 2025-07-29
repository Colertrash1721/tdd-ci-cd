class CoffeeMachine {
  constructor() {
    this.resources = {
      coffeeOz: 0,
      sugar: 0,
      cups: 0
    };

    this.cupSizes = {
      pequeño: 3,
      mediano: 5,
      grande: 7
    };
  }

  loadResources({ coffeeOz, sugar, cups }) {
    this.resources = { coffeeOz, sugar, cups };
  }

  getCupSize(size) {
    return this.cupSizes[size.toLowerCase()];
  }

  setSugar(amount) {
    return `${amount} cucharadas de azúcar añadidas`;
  }

  dispenseCoffee(size, sugar) {
    const cupSize = this.getCupSize(size);

    if (this.resources.cups <= 0) {
      throw new Error('No hay vasos disponibles');
    }

    if (this.resources.coffeeOz < cupSize) {
      throw new Error('No hay suficiente café');
    }

    if (this.resources.sugar < sugar) {
      throw new Error('No hay suficiente azúcar');
    }

    this.resources.cups--;
    this.resources.coffeeOz -= cupSize;
    this.resources.sugar -= sugar;

    return `Disfrute su café de ${cupSize} Oz con ${sugar} cucharadas de azúcar`;
  }
}

module.exports = CoffeeMachine;
