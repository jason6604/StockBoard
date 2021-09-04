<template>
  <AddStock
    v-if="showAddStock"
    @add-stock="addStock"
    @get-stockinfo="getStockInfo"
    :stocks="stocks"
  />
  <Stocks
    @toggle-reminder="toggleReminder"
    @delete-stock="deleteStock"
    @update-stock="updateStock"
    :stocks="stocks"
  />
</template>

<script>
import Stocks from "../components/Stocks.vue";
import AddStock from "../components/AddStock.vue";

export default {
  setup() {},
  name: "Home",
  props: {
    showAddStock: Boolean,
  },
  components: {
    Stocks,
    AddStock,
  },
  data() {
    return {
      stocks: [],
      html: "",
      cstock: 0,
    };
  },
  methods: {
    async addStock(stock) {
      const response = await fetch("api/stocks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(stock),
      });

      const data = await response.json();
      this.stocks = [...this.stocks, data];
    },
    async deleteStock(id) {
      if (confirm("Are you sure to delete?")) {
        const response = await fetch(`api/stocks/${id}`, {
          method: "DELETE",
        });
        response.status === 200
          ? (this.stocks = this.stocks.filter((stock) => stock.id !== id))
          : alert("Error deleting stock");
      }
    },
    async toggleReminder(id) {
      const stockToToggle = await this.fetchStock(id);
      const updateStock = {
        ...stockToToggle,
        reminder: !stockToToggle.reminder,
      };
      const response = await fetch(`api/stocks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateStock),
      });

      const data = await response.json();

      this.stocks = this.stocks.map((stock) =>
        stock.id === id ? { ...stock, reminder: data.reminder } : stock
      );
    },
    async getStockInfo(checkexist, id, callback) {
      if (checkexist && this.stocks.find((stock) => stock.id === id)) {
        alert(`Stock ${id} is already existed.`);
        await callback(null);
        return;
      }
      const response = await fetch(
        `http://localhost:3000/apiv2/getStockInfo/${id}`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.log(error);
        });
      //const resultData = await response.json();
      await callback(response);
    },
    async updateStock() {
      this.stocks.forEach(async (stock) => {
        await this.getStockInfo(false, stock.id, async (result) => {
          if (!result) {
            return;
          }
          stock.price = result.price;
          this.cstock += 1;
        });
      });

      var updateInterval = setInterval(() => {
        console.log("execute updateInterval");
        if (this.cstock >= this.stocks.length) {
          this.stocks.forEach(async (stock) => {
            const updateStock = {
              ...stock,
            };

            const response = await fetch(`api/stocks/${stock.id}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(updateStock),
            }).catch((error) => {
              console.log(error);
            });
          });

          this.cstock = 0;
          clearInterval(updateInterval);
        }
      }, 3000);
    },
    async fetchStocks() {
      //const response = await fetch('http://localhost:5000/stocks')
      const response = await fetch("api/stocks");
      const data = await response.json();

      return data;
    },
    async fetchStock(id) {
      //const response = await fetch(`http://localhost:5000/stocks/${id}`)
      const response = await fetch(`api/stocks/${id}`, {
        method: "GET",
      });
      const data = await response.json();

      return data;
    },
  },
  async created() {
    this.stocks = await this.fetchStocks();

    /*this.stocks = [
      {
        id: 1,
        text: "Doctors Appointment",
        day: "March 1st at 2:30pm",
        reminder: true,
      },
      {
        id: 2,
        text: "Meet Nao",
        day: "March 3st at 1:30pm",
        reminder: true,
      },
      {
        id: 3,
        text: "Go grocery shopping",
        day: "March 5st at 5:30pm",
        reminder: false,
      },
    ];*/
  },
};
</script>