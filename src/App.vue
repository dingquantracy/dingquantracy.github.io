<template>
    <div>
        <h3>this is App component</h3>
        <Top>
            <div slot="content">www</div>
        </Top>
    </div>
</template>

<script>
import Top from './components/Top'

export default {
    name: 'App',
    components: {
        Top
    }
}
</script>

<style>
    @import './reset.css'
</style>