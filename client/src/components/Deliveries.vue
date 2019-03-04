<template>
  <div id="app">
    <v-data-table
      :headers="mainHeaders"
      :items="mainItems"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" scope="props">
        <tr v-bind:style="selectColors(props.item.status)">
          <td class="text-sm-left">{{ props.item.id }}</td>
          <td class="text-sm">{{ props.item.address }}</td>
          <td class="text-sm">{{ props.item.phoneNumber }}</td>
          <td class="text-sm">{{ props.item.status }}</td>
          <td class="text-sm">{{ props.item.Restaurant.address }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import DeliveriesService from "@/services/DeliveriesService";
export default {
  data() {
    return {
      mainHeaders: [
        { text: "Id", value: "id" },
        { text: "Address", value: "address" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "Restaurant Address", value: "restaurantAddress" }
      ],
      mainItems: []
    };
  },
  async mounted() {
    this.mainItems = (await DeliveriesService.getAllDeliveries()).data;
    console.log(this.mainItems);
  },
  methods: {
    selectColors(status) {
      var bC = "backgroundColor: "
      if (status === 0) return bC + "red"
      else if (status === 1) return bC + "blue"
      return bC + "transparent";
    }
  }
};
</script>