<template>
  <div>
    <CustomHeader page="community" />
    <div class="community-page">
      <Tabs />
    </div>
    <CustomFooter />
  </div>
</template>

<script>
import CustomHeader from '../../components/CustomHeader.vue';
import CustomFooter from '../../components/CustomFooter.vue';
import Tabs from 'src/components/community/CommunityTabs.vue';

export default {
  components: {
    CustomFooter,
    CustomHeader,
    Tabs,
  },
};
</script>
