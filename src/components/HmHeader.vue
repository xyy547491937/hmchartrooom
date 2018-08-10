<template>
<div>
     <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">瓜果旗舰店</x-header>
</div>
    
</template>

<script>
    import { XHeader } from 'vux'

    export default {
    components: {
        XHeader
    }
 }
</script>
<style lang="less">

</style>
