import Base from 'lowdb/adapters/Base'
class LocalStorage extends Base {
  read() {
    const data = uni.getStorageSync(this.source)
    if (data && data !== '') {
      console.log(data)
      return this.deserialize(data)
    } else {
      uni.setStorageSync(this.source, this.serialize(this.defaultValue))
      return this.defaultValue
    }
  }

  write(data) {
    uni.setStorageSync(this.source, this.serialize(data))
  }
}

export default LocalStorage
