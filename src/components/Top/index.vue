<template>
    <div class="blog-top">
        <h3>{{title}}</h3>
        --- {{title}} !!!
        <img src="./images/test.png" width="120px"/>
        <!--<slot name='content'></slot>-->

        <div class="markdown-body" v-html="rawHtml"></div>
    </div>
</template>

<script>
import path from 'path'

export default {
    name: 'top',
    data() {
        return {
            title: 'Blog',
            rawHtml: ''
        }
    },
    components: {
    },
    created(){
        const me = this
        this.$http.get('/data/2016-1.json').then((rs) => {
            console.log(rs.body.a.content)
            me.rawHtml = rs.body.a.content
        })
    }
}
</script>

<style lang="postcss">
.blog-top{
    color: red;
    h3 {
        color: green
    }
}
</style>