class menu {
    constructor(nome, tipo, quantita) {
      this.nome = nome;
      this.tipo = tipo;
      this.quantity = quantita;
    }
  }
  
  class Antipasto extends menu {
    constructor(nome) {
      super(nome, 'antipasto', 0);
    }
  }
  
  class Primo extends menu {
    constructor(nome) {
      super(nome, 'primo', 0);
    }
  }
  
  class Secondo extends menu {
    constructor(nome) {
      super(nome, 'secondo', 0);
    }
  }
  
  class Dolce extends menu {
    constructor(nome) {
      super(nome, 'dolce', 0);
    }
  }
  let carrello = []
  let ordini = []
  let vetMenu = [
      new Antipasto("Bao"),
      new Antipasto("Involtino primavera"),
      new Antipasto("Edamame"),
      new Antipasto("Nuvole di drago"),
      new Antipasto("Wakame"),
      new Antipasto("Tartare di salmone"),
      new Antipasto("Tartare di tonno"),
      new Antipasto("Sashimi di salmone"),
      new Antipasto("Sashimi di tonno"),
      new Antipasto("Salmone scottato"),
      new Primo("Gyoza"),
      new Primo("Ravioli di gamberi"),
      new Primo("Ravioli verdure"),
      new Primo("Ravioli pollo"),
      new Primo("Gyoza alla piastra"),
      new Primo("Zuppa di miso"),
      new Primo("Yaki Udon"),
      new Primo("Spaghetti di soia"),
      new Primo("Gnocchi di riso"),
      new Secondo("Nigiri al salmone"),
      new Secondo("Nigiri al tonno"),
      new Secondo("Gunkan tobiko"),
      new Secondo("Gunkan salmone"),
      new Secondo("Gunkan tonno"),
      new Secondo("Hosomaki"),
      new Secondo("Uramaki"),
      new Secondo("Temaki"),
      new Secondo("Futomaki"),
      new Dolce("Gelato fritto"),
      new Dolce("Moki"),
      new Dolce("Sorbetto al limone")
  ];
  
  class RestaurantMenu extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.menu = vetMenu.map(item => {
        return {
          quantity: 0,
          nome: item.nome,
          tipo: item.tipo,
          
        };
      });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const menuByCategory = this.groupMenuByCategory();
      const style = `
        <style>
          .menu-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            overflow-y: scroll;
            height: 500px;
            margin: 10px;
          }
          .category {
            background-color: #d5bde4;
            color: white;
            padding: 10px;
            margin-top: 10px;
            width: 300px;
            text-align: center;
          }
          .item {
            background-color: #9e3edd;
            border: 1px solid #ccc;
            padding: 10px 10px;
            margin: 5px;
            width: 280px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          .item .quantity {
            background-color: #4CAF50;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            margin-left: 5px;
          }
        </style>
      `;
      const template = `
            ${style}
            <div class="menu-container">
              ${menuByCategory.map(category => `
                <div class="category">
                  <h2>${category.category}</h2>
                  ${category.items.map(item => `
                    <div class="item">
                      <span>${item.nome}</span>
                      <div>
                        <button onclick="addToCart('${item.nome}')">+</button>
                        <span class="quantity">${item.quantity}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
            </div>`;
    
       this.shadowRoot.innerHTML = template;
    }
  
    groupMenuByCategory() {
        const categories = {};
        this.menu.forEach(item => {
          if (!categories[item.tipo]) {
            categories[item.tipo] = []; 
          }
          categories[item.tipo].push(item);  
        });
        const menuByCategory = [];
        for (const category in categories) {
          menuByCategory.push({ category, items: categories[category] });
        }
        return menuByCategory;
      }
  }
  function addToCart(nome, root) {
    carrello.push(nome)
    let menuItem ={};
    for (const item of vetMenu) {
      if (item.nome === nome) {
        menuItem = item;
        break;
      }
    }
    if (menuItem) {
      if (menuItem.quantity < 3 || menuItem.quantity === undefined) {
        menuItem.quantity++;
        console.log("nome: "+nome+", quantita: "+menuItem.quantity)
      } else {
        alert(`Non è possibile ordinare più di 3 volte ${nome}.`);
      }
    }
     
  }

  customElements.define('restaurant-menu', RestaurantMenu);
  
  function aggiungiOrdine(){
    ordini = carrello
    console.log(ordini)
    alert('ordine inviato')
  }
  function statoOrdine(){
    let a = ""
    for(let i=0; i<ordini.length; i++){
        a+=ordini[i]+"\n"
    }
    alert('il tuo ordine comprende:\n'+a)
  }