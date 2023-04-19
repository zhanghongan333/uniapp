<template>
  <view class="content">
    <view
      v-for="item in list"
      :key="item.id"
      class="menu"
    >
      <u-avatar
        :icon="item.icon"
        shape="square"
        @click="handleMenu(item)"
      />
      <view>{{ item.name }}</view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getMenuData } from '@/api/platform/auth/appres'
export default {
  components: {
  },
  data() {
    return {
      title: '工作台',
      userInfo: this.$store.getters.userInfo,
      tabbar: 0,
      list: []
    }
  },
  onLoad(option) {
  },
  computed: {
    // ...mapState({
    //   userInfo: state => state.chain.user.info
    // })
    ...mapState('chain/user', [
      'info'
    ])
  },
  mounted() {
    this.loadMenus()
  },
  methods: {
    loadMenus() {
      getMenuData().then(response => {
        this.list = response.data
      })
    },
    handleClick() {

    },
    handleMenu(item) {
      const defaultUrl = item.defaultUrl
      uni.$e.route({ url: defaultUrl })
    }
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: auto;
  height: 100%;
  .menu{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100px;
    height: 100px;
  }

}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
