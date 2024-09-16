let fruitsStock = [
  { id: 1, name: "Pomme", quantity: 10 },
  { id: 2, name: "Poire", quantity: 5 },
  { id: 3, name: "Ananas", quantity: 8 },
];

// Pas de retour d'objet dans les fonctions, modifications de l'objet directement

function addFruitToStock(name: string, quantity: number) {
  const existingProduct = fruitsStock.find((p) => p.name === name);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    fruitsStock.push({ id: fruitsStock.length + 1, name, quantity });
  }
}

function deleteFruit(name: string) {
  fruitsStock = fruitsStock.filter((p) => p.name !== name);
  console.log(`${name} deleted from stock`);
}

function showStock() {
  fruitsStock.forEach((fruit) => {
    console.log(`Fruit : ${fruit.name} | Quantity : ${fruit.quantity}`);
  });
}

function sellFruit(name: string, quantity: number) {
  const fruit = fruitsStock.find((p) => p.name === name);

  if (fruit && fruit.quantity >= quantity) {
    fruit.quantity -= quantity;
    console.log(`${quantity} ${name} sold`);
  } else {
    console.log(`Not enough ${name} or unknown fruit`);
  }
}

addFruitToStock("Pomme", 5);
addFruitToStock("Citron", 10);
sellFruit("Ananas", 2);
showStock();
deleteFruit("Ananas");
showStock();

/*
2 Ananas sold
Fruit : Pomme | Quantity : 15
Fruit : Poire | Quantity : 5
Fruit : Ananas | Quantity : 6
Fruit : Citron | Quantity : 10
Ananas deleted from stock
Fruit : Pomme | Quantity : 15
Fruit : Poire | Quantity : 5
Fruit : Citron | Quantity : 10
*/
