document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Indomie Goreng", img: "warbg20.jpg", price: 10000 },
      { id: 1, name: "Bubur KacangIjo", img: "warbg19.jpg", price: 6000 },
      { id: 1, name: "Indomie Rebus", img: "warbg17.jpg", price: 10000 },
      { id: 1, name: "Kopi ", img: "warbg27.jpg", price: 3000 },
      { id: 1, name: "Gorengan", img: "warbg29.jpg", price: 2000 },
    ],
  }));
});
