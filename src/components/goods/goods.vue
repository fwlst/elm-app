<template>
    <div class="goods">
        <div class="menu-wrapper" v-el:menu-wrapper>
            <ul class="menu-ul">
                <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}"
                    @click="selectMenu($index,$event)">
            <span class="text">
              <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" v-el:foods-wrapper>
            <ul>
                <li v-for="item in goods" class="foods-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img width="57" height="57" :src="food.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description }}</p>
                                <div class="extra">
                                    <span class="cont">月售{{food.sellCont}}/份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice"></shopcart>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopCart/shopcart.vue';
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';

    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods(){
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                });
                return foods;
            }
        },
        created (){
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

            const _this = this;
            const url = '/api/goods';
            this.$http.get(url).then((res) => {
                if (res.data.errCode == ERR_OK) {
                    _this.goods = res.data.data;
                    _this.$nextTick(() => {
                        _this._initScroll();
                        _this._caluclateHeight();
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        name: '',
        data () {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0
            }
        },
        methods: {
            selectMenu(index, e){
                if (!e._constructed) {
                    return;
                }
                let fooList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = fooList[index];
                this.foodsScroll.scrollToElement(el, 300);
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$els.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
                    probeType: 3,
                    click: true
                });
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _caluclateHeight (){
                let fooList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < fooList.length; i++) {
                    let item = fooList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            _drop(target){
                //体验优化，异步执行下落动画
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target);
                })
            }
        },
        components: {
            shopcart,
            cartcontrol
        },
        events: {
            'cart.add'(target){
                this._drop(target);
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less" scoped>
    @import "../../common/css/mixin";

    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .menu-item {
                display: table;
                width: 56px;
                height: 54px;
                line-height: 14px;
                padding: 0 12px;
                &.current {
                    position: relative;
                    z-index: 10;
                    margin-top: -1px;
                    background: #fff;
                    font-weight: 700;
                    .text {
                        .border-none
                    }
                }
                .text {
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    .border-1px(rgba(7, 17, 27, 0.1))
                }
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                        .bg-image('../../components/goods/decrease_3');
                    }
                    &.discount {
                        .bg-image('../../components/goods/discount_3');
                    }
                    &.guarantee {
                        .bg-image('../../components/goods/guarantee_3');
                    }
                    &.invoice {
                        .bg-image('../../components/goods/invoice_3');
                    }
                    &.special {
                        .bg-image('../../components/goods/special_3');
                    }
                }
            }
        }
        .foods-wrapper {
            flex: 1;
            .title {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f3f7;
            }
            .food-item {
                display: flex;
                margin: 18px 18px 0;
                padding-bottom: 18px;
                .border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    .border-none()
                }
                .icon {
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc, .extra {
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        margin-bottom: 8px;
                    }
                    .extra {
                        .cont {
                            margin-right: 13px;
                        }
                    }
                    .price {
                        font-weight: 700;
                        line-height: 24px;
                        .now {
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240, 20, 20);
                        }
                        .old {
                            text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
        }
    }
</style>
