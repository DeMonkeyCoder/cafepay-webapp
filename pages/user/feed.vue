<template>
  <div dir="rtl">
    <div class="feed">
      <img class="feed__header" src="@/assets/img/feed-shapes-1.png" alt="" />
              <b-input
              ref="tablecode"
              class="cp-input feed__search cp-input-primary  shadow-lg"
              type="code"
              icon="magnify"
              placeholder="جست‌وجو در کافه‌پِی"
            ></b-input>
          </b-field>
      <section class="feed__post">
        <header class="feed__section-header">رویدادها</header>
        <div class="feed__post__wrapper">
        <div class="feed__post__list" v-for="(post, index) in postList" :key="index">
          <img class="feed__post__list__avatar" :src="post.img" alt="">
          <img class="feed__post__list__img" :src="post.avatar" alt="">
          <div class="feed__post__list__content shadow-lg">
            <p class="eed__post__list__content__text">{{post.short_description}}</p>
          </div>
        </div>
        </div>
      </section>
      <section class="feed__cafe-list">
        <header class="feed__section-header">کافه و رستوران</header>
        <div
          v-for="(cafe, index) in cafeList"
          :key="index"
          class="feed__cafe-list__cafe"
          :style="{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 1) 85%),url(${cafe.header})`
          }"
        >
          <img class="shadow" :src="cafe.img" alt="" />
          <div class="cafe-content">
            <p class="cafe-content__name">{{ cafe.name }}</p>
            <p class="cafe-content__short-desc">{{ cafe.description }}</p>
          </div>
        </div>
      </section>
    </div>
    <navigation class="navigation-in-home" />
  </div>
</template>

<script>
import navigation from '~/components/user/navigation.vue'
export default {
  components: { navigation },
  head() {},
  data() {
    return {
      postList: [
        {
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          avatar: require('~/assets/img/feed-post-img.jpg'),
          short_description: ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،'
        },
            {
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          avatar: require('~/assets/img/feed-post-img.jpg'),
          short_description: ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،'
        },
            {
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          avatar: require('~/assets/img/feed-post-img.jpg'),
          short_description: ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،'
        }
      ],
      cafeList: [
        {
          name: 'باغشاه - ۵۰',
          token: '123456',
          description: 'توضیح مختصر در این قسمت',
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          header: require('~/assets/img/1.jpg')
        },
        {
          name: 'باغشاه - ۵۰',
          token: '123456',
          description: 'توضیح مختصر در این قسمت',
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          header: require('~/assets/img/2.jpg')
        },
        {
          name: 'باغشاه - ۵۰',
          token: '123456',
          description: 'توضیح مختصر در این قسمت',
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          header: require('~/assets/img/3.jpg')
        },
        {
          name: 'باغشاه - ۵۰',
          token: '123456',
          description: 'توضیح مختصر در این قسمت',
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          header: require('~/assets/img/4.jpg')
        }
      ]
    }
  },
  methods: {},

  mounted() {
    this.$store.dispatch('cafe/retreiveList')
  //   this.$bus.$on('shrink', flag => {
  //     if (flag) {
  //       $('.navigation-in-home').addClass('navigation-in-home-shrink')
  //     } else {
  //       $('.navigation-in-home').removeClass('navigation-in-home-shrink')
  //     }
  //   })
  },
  computed: {
    list() {
      return this.$store.state.cafe.list 
    },
  },
}
</script>

<style scoped lang="sass">
</style>