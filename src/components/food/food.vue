<template>
    <div class="food" v-show="showFlag" transition="move">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image">
                <div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
            </div>
        </div>
    </div>
</template>
<style lang="less" type="text/css" rel="stylesheet/less" scoped>
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
        transition: all 0.2s linear;
        &.move-transition {
            transform: translate3d(0, 0, 0);
        }
        &.move-enter, &.move-leave {
            transform: translate3d(100%, 0, 0);
        }
        .image-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                top: 10px;
                left: 0;
                .icon-arrow_lift {
                    display: block;
                    padding: 10px;
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data(){
            return {
                showFlag: false
            }
        },
        methods: {
            show(){
                this.showFlag = true;
            },
            hide(){
                this.showFlag = false;
            }
        }
    };
</script>
