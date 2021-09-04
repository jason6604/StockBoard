<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Stock ID</label>
      <input
        @blur="getStockInfo"
        type="text"
        v-model="stockId"
        name="stockId"
        placeholder="Add Stock ID"
      />
    </div>
    <div class="form-control">
      <label>Current Price</label>
      <input
        type="text"
        v-model="stockPrice"
        name="stockPrice"
        placeholder="Stock price will be populated automatically"
        disabled="true"
      />
    </div>
    <div class="form-control">
      <label>Stock Name</label>
      <input
        type="text"
        v-model="stockName"
        name="stockName"
        placeholder="Stock name will be populated automatically"
        disabled="true"
      />
    </div>
    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Stock" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  setup() {},
  name: "AddStock",
  props: {
    stocks: Array,
  },
  data() {
    return {
      stockId: "",
      stockName: "",
      stockPrice: "",
      reminder: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.stockId || !this.stockName || !this.stockPrice) {
        alert("Please add a stock");
        return;
      }
      const newStock = {
        //id: Math.floor(Math.random() * 100000),
        id: this.stockId,
        name: this.stockName,
        price: this.stockPrice,
        reminder: this.reminder,
      };

      this.$emit("add-stock", newStock);

      this.stockId = "";
      this.stockName = "";
      this.stockPrice = "";
      this.reminder = false;
    },
    async getStockInfo() {
      this.$emit("get-stockinfo", true, this.stockId, (result) => {
        if (result && typeof result !== "undefined") {
          this.stockName = result.name;
          this.stockPrice = result.price;
        } else {
          this.stockId = "";
          this.stockName = "";
          this.stockPrice = "";
          this.reminder = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>