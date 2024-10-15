<template>
    <v-container>
      <v-card>
        <v-card-title>Page Builder</v-card-title>
        <v-row>
          <v-col cols="9">
            <form-builder />
          </v-col>
  
          <v-col cols="3">
            <!-- Additional settings or page-specific options can go here -->
            <v-card>
              <v-card-title>Page Settings</v-card-title>
              <v-card-text>
                <!-- Add page-specific settings -->
                <v-text-field label="Page Title" v-model="pageTitle" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import FormBuilder from "./FormBuilder.vue";
  
  export default {
    components: {
      FormBuilder,
    },
    data() {
      return {
        pageTitle: "My Page",
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any page-specific styles here */
  </style>
  