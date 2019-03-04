import Api from '@/services/Api'

export default {
  getAllDeliveries () {
    return Api().get('delivery')
  }
}
