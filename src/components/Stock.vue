<template>
  <div
    @dblclick="$emit('toggle-reminder', stock.id)"
    :class="[stock.reminder ? 'reminder' : '', 'stock']"
    draggable="true"
  >
    <h3>
      <span>{{ stock.id }}</span>
      <i @click="$emit('delete-stock', stock.id)" class="fas fa-times"></i>
    </h3>
    <p>
      <span>{{ stock.name }}</span>
      <span>{{ stock.price }}</span>
    </p>
  </div>
</template>

<script>
export default {
  setup() {},
  name: "Stock",
  props: {
    stock: Object,
  },
};
</script>

<style scoped>
.fas {
  color: red;
}

.stock {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.stock.reminder {
  border-left: 5px solid green;
}
.stock h3 {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stock p {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stock p span{
  font-weight: bold;
  font-size: 1.3em;
}
</style>
