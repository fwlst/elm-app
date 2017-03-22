<template>
    <div class="rating-select">
        <div class="rating-type">
            <span class="black">{{desc.all}}</span>
            <span class="black">{{desc.positive}}</span>
            <span class="black">{{desc.negative}}</span>
        </div>
        <div class="switch">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容评价</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    const ALL = 2;
    const NEGATIVE = 1;
    const POSITIVE = 0;

    export default {
        props: {
            ratings: {
                type: Array,
                default(){
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default(){
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        }
    };
</script>
<style lang="less" type="text/css" rel="stylesheet/less" scoped>
    @import "../../common/css/mixin";
    .rating-select {
        .rating-type {
            padding: 18px 0;
            margin: 0 18px;
            .borderT-1px(rgba(7, 17, 27, 0.1));
        }
    }
</style>

