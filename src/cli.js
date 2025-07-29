const inquirer = require('inquirer');
const CoffeeMachine = require('./coffeMachine');

const machine = new CoffeeMachine();

machine.loadResources({
  coffeeOz: 50,
  sugar: 20,
  cups: 10
});

async function startCLI() {
  console.clear();
  console.log('☕ Bienvenido a la máquina dispensadora de café ☕\n');

  try {
    const { size } = await inquirer.prompt([
      {
        type: 'list',
        name: 'size',
        message: 'Seleccione el tamaño del vaso:',
        choices: ['pequeño', 'mediano', 'grande']
      }
    ]);

    const { sugar } = await inquirer.prompt([
      {
        type: 'number',
        name: 'sugar',
        message: '¿Cuántas cucharadas de azúcar desea?',
        validate: value =>
          Number.isInteger(value) && value >= 0
            ? true
            : 'Ingrese un número entero válido.'
      }
    ]);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `¿Desea preparar su café ${size} con ${sugar} cucharada(s) de azúcar?`
      }
    ]);

    if (!confirm) {
      console.log('Operación cancelada.');
      return;
    }

    const result = machine.dispenseCoffee(size, sugar);
    console.log('\n✅ ' + result);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

startCLI();
