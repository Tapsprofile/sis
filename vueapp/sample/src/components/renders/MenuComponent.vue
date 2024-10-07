<template>
  <div>
    <ul>
      <li v-for="item in menuItems" :key="item.type" @click="$emit('item-selected', item.type)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuComponent',
  props: {
    menuItems: Array
  }
};
</script>
