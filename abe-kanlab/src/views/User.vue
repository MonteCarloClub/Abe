<template>
  <div class="user">
    <PlaceHolder msg="这是一个用户信息页面"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PlaceHolder from '@/components/PlaceHolder.vue'

export default {
  name: 'User',
  components: {
    PlaceHolder
  }
}
</script>