<div class="wrapper">
    <div class="element-container">
        <h2 data-translate="label.app.basket" class="title-label"></h2>
    </div>
    <div id="step-1">
        <ul class="product-list">
            {{ if (products.length === 0) { }}
            <li class="element-container" data-translate="label.basket.emptyList"></li>
            {{ } }}
            {{var total = 0;}}
            {{ _.each(products, function(item,key) { }}
            {{total+=item.price.value*item.count}}
            <li class="row-fluid element-container" id="basket-product-{{=item.id}}">
                <div class="span2 b-image">
                    <img src="{{=item.image}}" alt=""/>
                </div>
                <div class="span5 name">
                    <p data-translate="label.product.name.{{=item.id}}"></p>
                    <div class="price">
                        <input class="count" value="{{=item.count}}" type="number" data-product-id="{{=item.id}}" />x
                        {{=item.price.value.toFixed(2)}} {{=item.price.currency}}</div>
                </div>
                <div class="span5 text-right">

                    <a class="btn minus" href="#" data-product-id="{{=item.id}}"><i class="fa fa-minus"></i></a>
                    <a class="btn plus" href="#" data-product-id="{{=item.id}}"><i class="fa fa-plus"></i></a>
                    <a class="btn remove" href="#" data-product-id="{{=item.id}}"><i class="fa fa-times"></i></a>
                </div>
            </li>
            {{ }); }}
        </ul>
        {{ if (products.length > 0) { }}
        <div id="basket-total" class="element-container text-right">
            <h2 class="title-label" data-translate="label.basket.totalPrice"></h2>
            <span class="total">{{=total.toFixed(2)}} {{=products[0].price.currency}}</span>
        </div>
        <div class="element-container b-pers">
            <a class="basket-confirm button" href="#">
                <i class="fa fa-check "></i> <span data-translate="label.basket.confirm"></span>
            </a>
        </div>

        {{ } }}
    </div>
    <div id="step-2" class="form hidden">
        <div class="element-container">
            <h2 data-translate="label.basket.typePlaceNumber" class="title-label small"></h2>
            <input type="text" data-translate="label.basket.seatNumber" name="seat-number"/>
            <div class="b-pers">
                <a class="order-confirm button" href="#">
                    <i class="fa fa-check "></i> <span data-translate="label.basket.order"></span>
                </a>
            </div>

            <a class="go-back" href="#">
                <i class="fa fa-angle-left"></i>
                <span data-translate="label.global.goBack"></span>
            </a>
        </div>
    </div>

</div>

