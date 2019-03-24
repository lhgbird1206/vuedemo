<template>
    <div>this is the home page!{{test}}</div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return {
                test: ''
            }
        },
        mounted(){
            this.test = 'welcome to home page';
        }
    }
</script>

<style scoped>

</style>