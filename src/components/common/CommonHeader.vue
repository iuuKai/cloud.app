<template>
  <!-- 公共头 -->
  <el-row class="cloud-header__wrap" type="flex">
    <!-- 左侧 -->
    <el-col class="header-left">
      <!-- logo -->
      <el-image fit="contain" class="header-logo" :src="logo"></el-image>
      <!-- 下拉 -->
      <el-dropdown trigger="click" @command="dropdownMenu">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in menuList"
            :key="item.title"
            :command="item"
          >
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <!-- 中间 -->
    <!-- 标签页 -->
    <el-col class="header-center">
      <el-tabs v-model="currItem" type="card" @tab-remove="removeTab">
        <el-tab-pane
          v-for="item in menuList"
          :key="item.title"
          :label="item.title"
          :name="item.title"
          :closable="item.title !== '首页' && item.title !== '应用'"
        >
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <!-- 右侧 -->
    <el-col class="header-right">
      <el-row
        class="header-right__box"
        type="flex"
        justify="end"
        align="middle"
      >
        <!-- 服务 -->
        <el-row class="right-bar__wrap" type="flex">
          <el-link
            type="info"
            :underline="false"
            v-for="item in rightList"
            :key="item.title"
            class="right-item"
          >
            <el-image
              class="right-item-icon"
              :src="imgURL(item.icon)"
            ></el-image>
            <span class="right-item-text">{{ item.title }}</span>
          </el-link>
        </el-row>
        <!-- 头像 -->
        <el-dropdown trigger="click" @command="dropdownUser">
          <el-avatar
            icon="el-icon-user-solid"
            :src="imgURL(avatar)"
          ></el-avatar>
          <el-dropdown-menu slot="dropdown" class="avatar-dropdown">
            <el-dropdown-item
              :class="item.className"
              v-for="item in userBarList"
              :key="item.title"
              :command="item"
            >
              <el-row>
                <span class="userbar-text">{{ item.title }}</span>
                <el-image v-if="item.icon" :src="imgURL(item.icon)"></el-image>
              </el-row>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      avatar: 'header.png',
      logo: 'https://gaoruiyun-wechat.oss-cn-shenzhen.aliyuncs.com/portal.apps/login/logo2_v2.png',
      currItem: '首页',
      // tabIndex: 2,
      rightList: [
        { icon: 'top_search.svg', title: '', path: '' },
        { icon: 'top_lxwm.svg', title: '联系我们', path: '' },
        { icon: 'top_user.svg', title: '售后服务', path: '' },
        { icon: 'top_bzzx.svg', title: '帮助中心', path: '' }
      ],
      userBarList: [
        { icon: '', title: '个人资料', path: '' },
        { icon: '', title: '消息设置', path: '' },
        { icon: '', title: '修改手机号', path: '' },
        { icon: '', title: '修改密码', path: '' },
        { icon: '', title: '切换账号', path: '' },
        { icon: '', title: '退出登录', className: 'logout', path: '' }
      ]
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menu.menuList
    }),
    icon () {
      return (path, size) => {
        return {
          // backgroundSize: size,
          backgroundImage: this.imgURL(path)
        }
      }
    },
    imgURL () {
      return (path) => `https://gaoruiyun-wechat.oss-cn-shenzhen.aliyuncs.com/portal.apps/index/${path}`
    }
  },
  methods: {
    // 下拉选择
    dropdownMenu (item) {
      console.log(item)
      this.$message.info(`点击${item.title}`)
    },
    dropdownUser (item) {
      // console.log(item)
      const { title } = item
      switch (title) {
        case '退出登录': this.handleLogout()
          break
        default: console.log(title)
          break
      }
    },
    // 退出登录
    handleLogout () {
      this.$store.commit('user/clearToken')
      this.$store.commit('user/clearUser')
      location.reload()
    },
    // addTab (targetName) {
    //   const newTabName = ++this.tabIndex + ''
    //   this.menuList.push({
    //     title: 'New Tab',
    //     name: newTabName,
    //     content: 'New Tab content'
    //   })
    //   this.currItem = newTabName
    // },
    removeTab (targetName) {
      const tabs = this.menuList
      let activeName = this.currItem
      // 删除自己
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.title === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              console.log(nextTab)
              activeName = nextTab.title
            }
          }
        })
      }
      this.currItem = activeName
      this.$store.commit('menu/removeMenu', targetName)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.cloud-header__wrap {
  height: 100%;
  // 头部左侧
  .header-left {
    padding: 10px 20px;
    width: 200px;
    height: 100%;
    flex: none;
    // logo
    .header-logo {
      height: 100%;
    }
    // 下拉
    .el-dropdown {
      margin-left: 20px;
      .el-dropdown-link {
        font-size: 26px;
        cursor: pointer;
      }
    }
    .header-logo,
    .el-dropdown {
      vertical-align: middle;
    }
  }
  // 头部中间
  .header-center {
    // 标签页
    .el-tabs {
      .el-tabs__header {
        margin-bottom: 0;
        border-bottom: 0 none;
        .el-tabs__nav {
          border-top: 0 none;
          .el-tabs__item {
            padding: 0 25px;
            height: 52px;
            line-height: 52px;
            font-size: 16px;
            // 关闭过度
            // transition: none;
            &.is-active {
              color: #fff;
              border-bottom: 0 none;
              background-color: #1e73ba;
              user-select: none;
            }
            &:hover:not(.is-active) {
              color: #000;
            }
            &.is-closable:hover {
              padding: 0 25px;
              span.el-icon-close {
                width: 16px;
              }
            }
            span.el-icon-close {
              margin-left: 0;
              position: absolute;
              top: 4px;
              right: 7px;
              width: 0;
              height: 16px;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
  // 头部右侧
  .header-right {
    .header-right__box {
      padding: 0 20px;
      height: 100%;
      .right-item {
        padding: 0 6px;
        .right-item-icon {
          margin-right: 4px;
          width: 20px;
          height: 20px;
        }
        // 行内元素垂直对齐
        .right-item-icon,
        .right-item-text {
          vertical-align: middle;
        }
      }
      .el-dropdown {
        margin-left: 10px;
        font-size: 0;
        cursor: pointer;
      }
    }
  }
}
// 头像下拉
::v-deep.avatar-dropdown {
  padding: 0;
  width: 180px;
  .el-dropdown-menu__item {
    &:focus,
    &:not(.is-disabled):hover {
      background-color: #f5f5f5;
      color: #101010;
    }
    &.logout {
      border-top: 1px solid #939eb9;
    }
    .userbar-text {
    }
    .userbar-icon {
    }
  }
  // 箭头
  .popper__arrow {
    display: none;
  }
}
</style>
