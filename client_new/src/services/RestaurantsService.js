import Api from '@/services/Api'

export default {
  getAllRestaurants() {
    return Api().get('restaurant');
  },

  updateRestaurant(restaurantId, restaurant) {
    return Api().put(`restaurant/${restaurantId} `, restaurant);
  },

  insertRestaurant(restaurant) {
    return Api().post('restaurant', restaurant);
  },

  deleteRestaurant(restaurantId) {
    return Api().delete(`restaurant/${restaurantId}`);
  }
}
