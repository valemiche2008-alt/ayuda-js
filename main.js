const btnAdd = document.getElementById("agregar");
const btnDel = document.getElementById("quitar");
const cartButton = document.getElementById("cartButton");

const counter = document.getElementById("counter");
let quantity = 0;

const iceCreams = [
  {
    description: "helado de fresa",
    price: 2500,
    photo: "https://picsum.photos/seed/fresa/300/300",
  },
  {
    description: "helado de chocolate",
    price: 2800,
    photo: "https://picsum.photos/seed/chocolate/300/300",
  },
  {
    description: "helado de vainilla",
    price: 2400,
    photo: "https://picsum.photos/seed/vainilla/300/300",
  },
  {
    description: "helado de mango",
    price: 2600,
    photo: "https://picsum.photos/seed/mango/300/300",
  },
  {
    description: "helado de coco",
    price: 2700,
    photo: "https://picsum.photos/seed/coco/300/300",
  },
  {
    description: "helado de limón",
    price: 2300,
    photo: "https://picsum.photos/seed/limon/300/300",
  },
  {
    description: "helado de mora",
    price: 2500,
    photo: "https://picsum.photos/seed/mora/300/300",
  },
  {
    description: "helado de pistacho",
    price: 3000,
    photo: "https://picsum.photos/seed/pistacho/300/300",
  },
  {
    description: "helado de cookies & cream",
    price: 3200,
    photo: "https://picsum.photos/seed/cookiescream/300/300",
  },
  {
    description: "helado de maracuyá",
    price: 2700,
    photo: "https://picsum.photos/seed/maracuya/300/300",
  },
  {
    description: "helado de banano",
    price: 2400,
    photo: "https://picsum.photos/seed/banano/300/300",
  },
  {
    description: "helado de café",
    price: 2900,
    photo: "https://picsum.photos/seed/cafe/300/300",
  },
  {
    description: "helado de arequipe",
    price: 3100,
    photo: "https://picsum.photos/seed/arequipe/300/300",
  },
  {
    description: "helado de chicle",
    price: 2600,
    photo: "https://picsum.photos/seed/chicle/300/300",
  },
  {
    description: "helado de frutos rojos",
    price: 2800,
    photo: "https://picsum.photos/seed/frutosrojos/300/300",
  },
  {
    description: "helado de piña colada",
    price: 3000,
    photo: "https://picsum.photos/seed/pinacolada/300/300",
  },
];

function add() {
  quantity++;
  counter.value = quantity;
  btnDel.classList.remove("hidden");
}

function remove() {
  if (quantity > 0) {
    quantity--;
    counter.value = quantity;
    if (quantity == 0) {
      btnDel.classList.add("hidden");
    }
  }
}

// btnAdd.addEventListener("click", () => add());

// btnDel.addEventListener("click", () => remove());

document.addEventListener("DOMContentLoaded", () => {
//   counter.value = 0;
//   if (quantity == 0) btnDel.classList.add("hidden");

  iceCreams.forEach((iceCream) => {
    const card = document.createElement("div");
    card.innerHTML = `<div
          class="bg-indigo-100 flex flex-col p-3 rounded-lg justify-center items-center space-y-3"
        >
          <figure class="flex items-center">
            <img
              class="w-80"
              src="${iceCream.photo}"
              alt=""
            />
          </figure>
          <section
            id="information"
            class="flex flex-col items-center justify-center space-y-3"
          >
            <p class="text-justify">
              ${iceCream.description}
            </p>
            <span class="opacity-60 text-xl">$${iceCream.price}</span>
            <div id="acciones" class="flex flex-row px-2 space-x-3">
              <button
              id="quitar"
                class="border border-red-300 px-2 rounded-xl cursor-pointer hover:bg-red-600 hover:text-stone-100"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                id="counter"
                disabled
                class="w-16 border border-gray-400 rounded p-1"
              />
              <button
              id="agregar"
                class="border border-emerald-300 px-2 rounded-xl cursor-pointer hover:bg-emerald-600 hover:text-stone-100"
              >
                <i class="fa-solid fa-plus"> </i>
              </button>
            </div>
          </section>
        </div>`;
    document.getElementById("products").appendChild(card);
  });
});
