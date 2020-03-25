<template>
  <div class="cafe-posts-info cp-tb-margin cp-tb-padding cp-side-padding">

    <b-modal :active.sync="isPostImageModalActive">
    <p class="image is-4by3">
        <img :src="currentImg">
    </p>
    </b-modal>

    <div v-for="(post, index) in posts" :key="post.date" class="post cp-card has-background-white">
      <span class="post-type-label" :style="{backgroundColor: `${post.type.color}`}">
        {{post.type.title}}
      </span>

      <div @click="setCurrentImg(post.img)" class="img" 
      :style="{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5),rgba(0, 246, 252, 0.2)),url(${post.img})`}">
           <p class="post-title font-16 right-align">{{post.title}}</p></div>
       
      <div class="post-content cp-tb-padding cp-side-padding">
        <p class="post-content right-align">{{post.content}}</p>
      </div>

      <div class="post-action cp-side-padding">

      <transition name="router-anim" mode="out-in">
        <span class="likes-count" :key="post.likes">
          {{ post.likes | currency }}
        </span>
        <!-- <span v-if="post.is_liked" :key="1">like shode</span>
        <span v-else :key="2">like nashode</span> -->
      </transition>

        <div class="icon-container">
        <b-icon :class="{'bounceIn': post.is_liked, 'flxipInY': !post.is_liked}" 
        @click.native="likeToggle(index)" size="is-medium" class="like-icon animated" 
        :icon="(post.is_liked) ? 'heart': 'heart-outline'"></b-icon>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isPostImageModalActive: false,
        currentImg: null,
        posts: [
          {
          img: '',
          type: {
            id: 1,
            title: 'تخفیف',
            color: '#E91E63'
          },
          img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          title: 'تخفیف ۵۰ درصدی کافه هدایت',
          content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
          likes: 859,
          is_liked: false
          },
          
          {
          img: '',
          type: {
            id: 3,
            title: 'رویداد',
            color: '#20BC32'
          },
          img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
          title: 'مسابقه بورد گیم همراه با جوایز',
          content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
          likes: 1576,
          is_liked: false
          },

          {
          img: '',
          type: {
            id: 2,
            title: 'محصول جدید',
            color: '#009fe3'
          },
          img: 'https://www.athenaspahotel.com/media/cache/jadro_resize/rc/tnxrezCu1579080551/jadroRoot/medias/_a1a8429.jpg',
          title: 'پاستا سیسیتینو محصول جدید کافه هدایت',
          content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
          likes: 24,
          is_liked: false
          }
        ]
      }

    },
    methods: {
      setCurrentImg(imgUrl) {
        this.currentImg = imgUrl
        this.isPostImageModalActive = true
      },
      likeToggle(index){
        // unlike
        if (this.posts[index].is_liked) {
          this.posts[index].likes += -1
        }
        // like
        else {
          this.posts[index].likes += 1
        }
        this.posts[index].is_liked = !this.posts[index].is_liked

      }
    },
  }
</script>

<style scoped lang="sass">

.slide-enter-active
  animation: slideUp 1s
  // animation-timing-function: cubic-bezier(0.42, 0, 1, 1)
  opacity: 0

.slide-leave-active
  animation: slideDown 1s
  animation-timing-function: cubic-bezier(0.42, 0, 1, 1)

@keyframes slideUp
  from
    transform: translateY(0px)
  to
    transform: translateY(20px)
    opacity: 0

@keyframes slideDown
  from
    transform: translateY(-20px)
    opacity: 0

  to
    transform: translateY(0px)
    opacity: 1



.router-anim-enter-active 
  animation: coming 0.15s
  opacity: 0

.router-anim-leave-active 
  animation: going 0.15s


@keyframes going 
  from 
    transform: translateY(0)
  
  to 
    transform: translateY(-10px)
    opacity: 0
  

@keyframes coming 
  from 
    transform: translateY(10px)
    opacity: 0
  
  to 
    transform: translateY(0)
    opacity: 1
  


</style>