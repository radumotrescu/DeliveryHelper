import Api from '@/services/Api'

export default {
  getAllDeliveries() {
    return Api().get('delivery');
  },

  updateDelivery(deliveryId, delivery) {
    return Api().put(`delivery/ ${deliveryId} `, delivery);
  },

  insertDelivery(delivery) {
    return Api().post('delivery', delivery);
  },

  getAllRestaurants() {
    return Api().get('restaurant');
  },

  deleteDelivery(deliveryId) {
    return Api().delete(`delivery/${deliveryId}`);
  }
}
