<template>
  <div dir="rtl">
    <div class="feed">
      <img class="feed__header" src="@/assets/img/feed-shapes-1.png" alt="" />
      <b-field>
        <b-input
          ref="tablecode"
          class="cp-input feed__search cp-input-primary shadow-lg"
          type="code"
          icon="magnify"
          placeholder="جست‌وجو در کافه‌پِی"
        ></b-input>
      </b-field>

      <!-- <section class="feed__post">
        <header class="feed__section-header">رویدادها</header>
        <div class="feed__post__wrapper">
          <div
            class="feed__post__list"
            v-for="(post, index) in postList"
            :key="index"
          >
            <img class="feed__post__list__avatar" :src="post.img" alt="" />
            <img class="feed__post__list__img" :src="post.avatar" alt="" />
            <div class="feed__post__list__content shadow-lg">
              <p class="eed__post__list__content__text">
                {{ post.short_description }}
              </p>
            </div>
          </div>
        </div>
      </section> -->
      
      <section class="feed__cafe-list">
        <header class="feed__section-header">کافه و رستوران</header>
        <div
          v-for="(cafe, index) in cafeList"
          :key="index"
          class="feed__cafe-list__cafe header-test"
          :style="{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.15) 0%, rgba(245, 245, 245, 0.85) 85%),url(${(cafe.header_image) ? cafe.header_image : defaultHeader})`,
          }"
        >
          <div class="feed__cafe-list__cafe__img">
            <img v-if="cafe.avatar" class="shadow" :src="cafe.avatar" alt="" />
            <p v-else>{{cafe.name}}</p>
            </div>
          <div class="cafe-content">
            <p class="cafe-content__name">{{ cafe.name }}</p>
            <p class="cafe-content__short-desc">{{ (cafe.short_description) ? cafe.short_description : `${cafe.name} در کافه‌پِی` }}</p>
            <div class="cafe-content__tags">
              <span v-if="cafe.preorder_token" class="font-10 shadow cafe-content__tags__pickup">پیکاپ</span>
              <span v-if="cafe.is_onsight" class="font-10 shadow cafe-content__tags__onsight">حضوری</span>
            </div>
          </div>
        
        </div>
      </section>
    </div>
    <navigation class="navigation-in-home" />
  </div>
</template>

<script>
import navigation from '~/components/user/navigation.vue'
import defaultHeader from '~/assets/img/background/cafe-1.png'
import svg from '~/assets/svg.js'
export default {
  components: { navigation },
  head() {},
  data() {
    return {
      defaultHeader,svg,
      postList: [
        {
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          avatar: require('~/assets/img/feed-post-img.jpg'),
          short_description:
            ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،',
        },
        {
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          avatar: require('~/assets/img/feed-post-img.jpg'),
          short_description:
            ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،',
        },
        {
          img: require('~/assets/img/shape/icons/test-cafe.png'),
          avatar: require('~/assets/img/feed-post-img.jpg'),
          short_description:
            ' لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،',
        },
      ],
      // cafeList: [
      //   {
      //     name: 'باغشاه - ۵۰',
      //     token: '123456',
      //     description: 'توضیح مختصر در این قسمت',
      //     img: require('~/assets/img/shape/icons/test-cafe.png'),
      //     header: require('~/assets/img/1.jpg'),
      //   },
      //   {
      //     name: 'باغشاه - ۵۰',
      //     token: '123456',
      //     description: 'توضیح مختصر در این قسمت',
      //     img: require('~/assets/img/shape/icons/test-cafe.png'),
      //     header: require('~/assets/img/2.jpg'),
      //   },
      //   {
      //     name: 'باغشاه - ۵۰',
      //     token: '123456',
      //     description: 'توضیح مختصر در این قسمت',
      //     img: require('~/assets/img/shape/icons/test-cafe.png'),
      //     header: require('~/assets/img/3.jpg'),
      //   },
      //   {
      //     name: 'باغشاه - ۵۰',
      //     token: '123456',
      //     description: 'توضیح مختصر در این قسمت',
      //     img: require('~/assets/img/shape/icons/test-cafe.png'),
      //     header: null
      //   },
      // ],
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
    cafeList() {
      return this.$store.state.cafe.list.results
    },
  },
}
</script>

<style scoped lang="sass">
</style>