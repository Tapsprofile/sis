<template>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th v-for="(header, index) in visibleHeaders" :key="index">
              {{ header }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="(header, colIndex) in visibleHeaders" :key="colIndex">
              {{ row[header] }}
            </td>
            <td>
              <button class="btn btn-primary btn-sm me-2" @click="editRow(rowIndex)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteRow(rowIndex)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="hiddenHeaders.length > 0" class="mt-2">
        <button class="btn btn-secondary btn-sm" @click="toggleShowAll">
          {{ showAll ? 'Show Less' : 'Show All' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TableElement',
    props: {
      data: {
        type: Array,
        required: true
      },
      headers: {
        type: Array,
        required: true
      },
      smallScreenColumns: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        showAll: false
      };
    },
    computed: {
      visibleHeaders() {
        if (this.showAll) {
          return this.headers;
        }
        return this.headers.slice(0, this.smallScreenColumns);
      },
      hiddenHeaders() {
        return this.headers.slice(this.smallScreenColumns);
      }
    },
    methods: {
      editRow(index) {
        this.$emit('edit-row', index);
      },
      deleteRow(index) {
        this.$emit('delete-row', index);
      },
      toggleShowAll() {
        this.showAll = !this.showAll;
      }
    }
  };
  </script>
  
  <style scoped>
  .table-responsive {
    overflow-x: auto;
  }
  
  @media (max-width: 768px) {
    .table th,
    .table td {
      white-space: nowrap;
    }
  }
  </style>
  