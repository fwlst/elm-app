<template>
    <div class="rating-select">
        <div class="rating-type">
            <span @click="select(2,$event)" class="black positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="black positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="black negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
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
        },
        computed:{
            positives(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType === POSITIVE;
                });
            },
            negative(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods:{
            select(type,e){
                if (!e._constructed) {
                    return;
                }
                this.selectType = type;
                this.$dispatch('rating-type.select',type);
            },
            toggleContent(e){
                if (!e._constructed) {
                    return;
                }
                this.onlyContent = !this.onlyContent;
                this.$dispatch('content.toggle', this.onlyContent);
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
            .border-1px(rgba(7, 17, 27, 0.1));
            .black{
                display: inline-block;
                padding: 8px 12px;
                margin-right: 8px;
                border-radius: 2px;
                font-size: 12px;
                color: rgb(77,85,93);
                &.active{
                    color: #fff;
                }
                &.positive{
                    background: rgba(0,160,220,0.2);
                    &.active{
                        background: rgb(0,160,220);
                    }
                }
                &.negative{
                    background: rgba(77,85,93,0.2);
                    &.active{
                        background: rgb(77,85,93);
                    }
                }
                .count{
                    font-size: 8px;
                }
            }
        }
        .switch{
            padding: 12px 18px;
            line-height: 24px;
            color: rgb(147,153,159);
            font-size: 0px;
            &.on{
                .icon-check_circle{
                    color: #00c850;
                }
            }
            .border-1px(rgba(7, 17, 27, 0.1));
            .icon-check_circle{
                font-size: 24px;
                margin-right: 4px;
            }
            .text{
                display: inline-block;
                vertical-align: top;
                font-size: 12px;
            }
        }
    }
</style>

