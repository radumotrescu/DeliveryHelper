<template>
  <div id="app">
    <v-btn href='/restaurants'>
      <a>Go to Restaurants</a>
    </v-btn>
    <v-app id="deliveryHelper">
      <v-toolbar flat color="white">
        <v-toolbar-title>My Deliveries</v-toolbar-title>
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
                  <v-flex xs12 sm6 md4>
                    <v-select
                      label="Restaurant Address"
                      v-model="editedItemRestaurantAddress"
                      :rules="[validationRules.required]"
                      :items="restaurantAddressOptions"
                    >
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-select
                      v-model="editedItemStatusAsString"
                      :rules="[validationRules.required]"
                      :items="statusOptions"
                      label="Status"
                    ></v-select>
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
          <tr v-bind:style="selectColors(props.item.status)">
            <td class="text-xs-right">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.address }}</td>
            <td class="text-xs-right">{{ props.item.phoneNumber }}</td>
            <td class="text-xs-right">{{ props.item.Restaurant.address }}</td>
            <td class="text-xs-right">
              {{ transformStatusIdToString(props.item.status) }}
            </td>
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
import DeliveriesService from "@/services/DeliveriesService";
export default {
  data() {
    return {
      mainHeaders: [
        { text: "Id", value: "id", width: "50" },
        { text: "Address", value: "address", align: "right" },
        { text: "Phone Number", value: "phoneNumber", align: "right" },
        {
          text: "Restaurant Address",
          value: "Restaurant.address",
          align: "right"
        },
        { text: "Status", value: "status", align: "center" },
        { text: "Actions", value: "name", align: "left", sortable: false }
      ],
      mainItems: [],
      restaurants: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        address: "",
        phoneNumber: "",
        RestaurantId: -1,
        status: -1
      },
      defaultItem: {
        address: "",
        phoneNumber: "",
        RestaurantId: -1,
        status: -1
      },
      editedItemRestaurantAddress: "",
      editedItemStatusAsString: "",

      statusOptions: ["Inregistrata", "In primire", "In livrare", "Livrata"],

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
    },

    restaurantAddressOptions() {
      return this.restaurants.map(r => r.address);
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  async mounted() {
    this.mainItems = (await DeliveriesService.getAllDeliveries()).data;
    this.restaurants = (await DeliveriesService.getAllRestaurants()).data;
  },

  methods: {
    refreshTable() {
      setTimeout(async () => {
        this.mainItems = (await DeliveriesService.getAllDeliveries()).data;
      }, 200);
    },

    selectColors(status) {
      var bC = "backgroundColor: ";
      if (status === 0) return bC + "#EF9A9A";
      // red lighten-3
      else if (status === 1) return bC + "#7986CB";
      // indigo lighten-2
      return bC + "transparent";
    },

    transformStatusIdToString(statusId) {
      return this.statusOptions[statusId];
    },

    transformStatusStringToId(statusString) {
      return this.statusOptions.indexOf(statusString);
    },

    findRestaurantAddressById(restaurantId) {
      return this.restaurants.filter(
        restaurant => restaurant.id === restaurantId
      )[0].address;
    },

    findRestaurantIdByAddress(restaurantAddress) {
      return this.restaurants.filter(
        restaurant => restaurant.address === restaurantAddress
      )[0].id;
    },

    editItem(item) {
      this.editedIndex = this.mainItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItemRestaurantAddress = this.findRestaurantAddressById(
        item.RestaurantId
      );
      this.editedItemStatusAsString = this.transformStatusIdToString(
        this.editedItem.status
      );
      this.dialog = true;
    },

    deleteItem(item) {
      const deliveryId = item.id;
      const result = confirm("Are you sure you want to delete this item?");
      if (result) {
        DeliveriesService.deleteDelivery(deliveryId);
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
      this.editedItem.RestaurantId = this.findRestaurantIdByAddress(
        this.editedItemRestaurantAddress
      );
      this.editedItem.status = this.transformStatusStringToId(
        this.editedItemStatusAsString
      );

      if (this.editedIndex > -1) {
        var mainItemId = this.mainItems[this.editedIndex].id;
        DeliveriesService.updateDelivery(mainItemId, this.editedItem);
      } else {
        DeliveriesService.insertDelivery(this.editedItem);
      }
      this.close();
      this.refreshTable();
    }
  }
};
</script>