<template>
  <div class="toolbar">
    <div>
      <label class="switch" title="Auto Update Price">
        <input type="checkbox" @click="autoUpdate()" v-bind:checked="isAutoUpdate" />
        <span class="slider round"></span>
      </label>
      <i @click="$emit('update-stock')" class="fas fa-sync-alt" title="Update Price"></i>
    </div>
  </div>
  <div :key="stock.id" v-for="stock in stocks">
    <Stock
      @toggle-reminder="$emit('toggle-reminder', stock.id)"
      @delete-stock="$emit('delete-stock', stock.id)" 
      :stock="stock"
    />
  </div>
</template>

<script>
import Stock from "./Stock.vue";

export default {
  setup() {},
  name: "Stocks",
  props: {
    stocks: Array,
  },
  data() {
    return{
    isAutoUpdate: false,
    }
  },
  components: {
    Stock,
  },
  methods: {
    autoUpdate()  {
      this.isAutoUpdate = !this.isAutoUpdate;
      this.$emit("auto-updatestocks", this.isAutoUpdate);
    }
  },
  emits: ["delete-stock", "toggle-reminder","update-stock","auto-updatestocks"],
};
</script>

<style scoped>
.fas {
  color: green;
  cursor: pointer;
}

.toolbar {
  margin: 5px;
  padding-right: 15px;
  padding-top: 10px;
}

.toolbar div {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toolbar i {
  font-size: 23px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 23px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>