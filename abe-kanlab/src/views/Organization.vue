<template>
  <div class="user">
    <PlaceHolder msg="这是一个组织页面"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PlaceHolder from '@/components/PlaceHolder.vue'

export default {
  name: 'Organization',
  components: {
    PlaceHolder
  }
}
</script>