<template>
  <div id="app">
    <router-link to="/deliveries" tag="v-btn">
      <a>Go to Deliveries</a>
    </router-link>
    <v-app id="deliveryHelper">
      <v-toolbar flat color="white">
        <v-toolbar-title>My Restaurants</v-toolbar-title>
        <v-divider vertical inset class="mx-2" />
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.name"
                      :rules="[validationRules.required]"
                      label="Name"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.address"
                      :rules="[validationRules.required]"
                      label="Address"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.phoneNumber"
                      counter="10"
                      :rules="[
                        validationRules.required,
                        validationRules.phoneNumberLength,
                        validationRules.phoneNumberFormat
                      ]"
                      label="Phone Number"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-data-table
        :headers="mainHeaders"
        :items="mainItems"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-right">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.address }}</td>
            <td class="text-xs-right">{{ props.item.phoneNumber }}</td>
            <td class="justify-center layout px-0">
              <v-icon center small class="mr-2" @click="editItem(props.item)">
                edit
              </v-icon>
              <v-icon center small class="mr-2" @click="deleteItem(props.item)">
                delete
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import RestaurantsService from "@/services/RestaurantsService";
export default {
  data() {
    return {
      mainHeaders: [
        { text: "Id", value: "id", width: "50" },
        { text: "Name", value: "name", align: "right" },
        { text: "Address", value: "address", align: "right" },
        { text: "Phone Number", value: "phoneNumber", align: "right" },
        { text: "Actions", value: "name", align: "left", sortable: false }
      ],
      mainItems: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        address: "",
        phoneNumber: ""
      },
      defaultItem: {
        name: "",
        address: "",
        phoneNumber: ""
      },

      validationRules: {
        required: value => !!value || "Required.",
        phoneNumberLength: value =>
          value.length === 10 || "10 digits required.",
        phoneNumberFormat: value => {
          const pattern = /\d{10}/; // this matches exactly 10 digits
          return pattern.test(value) || "10 digits required.";
        }
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async mounted() {
    this.mainItems = (await RestaurantsService.getAllRestaurants()).data;
  },

  methods: {
    refreshTable() {
      setTimeout(async () => {
        this.mainItems = (await RestaurantsService.getAllRestaurants()).data;
      }, 200);
    },

    editItem(item) {
      this.editedIndex = this.mainItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const restaurantId = item.id;
      const result = confirm("Are you sure you want to delete this item?");
      if (result) {
        RestaurantsService.deleteRestaurant(restaurantId);
        this.refreshTable();
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        var mainItemId = this.mainItems[this.editedIndex].id;
        RestaurantsService.updateRestaurant(mainItemId, this.editedItem);
      } else {
        RestaurantsService.insertRestaurant(this.editedItem);
      }
      this.close();
      this.refreshTable();
    }
  }
};
</script>