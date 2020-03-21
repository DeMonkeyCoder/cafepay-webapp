<template>
  <div class="cafe-posts-info cp-tb-margin cp-tb-padding">
    <div v-for="post in posts" :key="post.date" class="post cp-card has-background-white cp-tb-padding cp-side-padding">
      {{post.title}}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        posts: [
          {
          img: '',
          type: {
            id: 1,
            title: 'تخفیف'
          },
          title: 'تخفیف ۵۰ درصدی کافه هدایت',
          content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
          likes: 859,
          is_like: false
          },
          
          {
          img: '',
          type: {
            id: 1,
            title: 'تخفیف'
          },
          title: 'تخفیف ۵۰ درصدی کافه هدایت',
          content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
          likes: 859,
          is_like: false
          }
        ]
      }
    },
  }
</script>

<style scoped>

</style>