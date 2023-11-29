document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Indomie Goreng", img: "1.jpg", price: 10000 },
      { id: 2, name: "Bubur KacangIjo", img: "2.jpg", price: 6000 },
      { id: 3, name: "Indomie Rebus", img: "3.jpg", price: 10000 },
      { id: 4, name: "Kopi ", img: "4.jpg", price: 3000 },
      { id: 5, name: "Gorengan", img: "5.jpg", price: 2000 },
      { id: 6, name: "Bubur Ayam", img: "6.jpg", price: 8000 },
      { id: 7, name: "Susu Indomilk", img: "7.jpg", price: 5000 },
      { id: 8, name: "Milo", img: "8.jpg", price: 5000 },
      { id: 9, name: "Extra Joss", img: "9.jpg", price: 5000 },
      { id: 10, name: "Nutrisari Jeruk", img: "10.jpg", price: 4000 },
      { id: 11, name: "Es Teh Manis", img: "11.jpg", price: 4000 },
      { id: 12, name: "Pancong Lumer", img: "12.jpg", price: 10000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belom ada barang atau cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barang sudah ada di cart ,apakah barang berbeda atau sama dengan ada yang di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada ,tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan idnya
      const cartItem = this.items.find((item) => item.id === id);
      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        //telusuri 1 1
        this.items = this.items.map((item) => {
          //jika bkan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
    order() {
      const orders = this.items;

      // Format pesan WhatsApp dengan daftar pesanan
      let message = `Halo, saya ingin memesan:\n `;

      for (const order of orders) {
        message += `${order.quantity} ${order.name}(s) - Rp ${order.price}\n`;
      }

      message += `Dengan total ${this.total}`;
      // Nomor WhatsApp tujuan
      const phoneNumber = "6285691894624";

      // Buat tautan WhatsApp dengan pesan
      const whatsappLink = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(
        message
      )}`;

      // Buka tautan WhatsApp
      window.location.href = whatsappLink;
      //
    },
  });
});

//konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
