<ul class="products wrapper" style="position: relative">
    {{ _.each(products, function(item,key) { }}
        <li class="product grid">
            <div class="clearfix">
                <div class="p-body">
                    <h2>
                        {{ if (item.isPopular) { }}
                        <i class="fa fa-smile-o"></i>
                        {{ } }}
                        {{ if (item.isPromotion) { }}
                        <i class="fa fa-bookmark"></i>
                        {{ } }}
                        <span data-translate="label.product.name.{{=item.id}}"></span>
                    </h2>
                </div>
                <div class="row-fluid">
                    <div class="span6">
                        <div class="photo">
                            <img src="{{=item.image}}" alt=""/>
                            {{ if (item.price.discount) { }}
                                <span class="discount"></span>
                                <div class="d-price">
                                    -{{=item.price.discount}} %
                                </div>
                            {{ } }}
                        </div>
                    </div>
                    <div class="span6 element-container">
                        <div class="price">
                            <span>{{=item.price.value.toFixed(2)}} {{=item.price.currency}}</span>
                            (<small data-translate="label.global.piece"></small>)
                        </div>
                    </div>
                </div>

            </div>

            <p data-translate="label.product.body.{{=item.id}}"></p>
            {{ if (item.hasExtendedBody) { }}
            <div class="more hidden">
                <p data-translate="label.product.extendedBody.{{=item.id}}"></p>
            </div>
            {{}}}
            <div class="controls clearfix text-right">
                {{ if (item.hasExtendedBody) { }}
                    <div class="fb">
                        <div class="icon">
                            <i></i>
                            <span class="tap"></span>
                        </div>
                    </div>
                {{ } }}

                <a class="btn add-product" href="#" data-product-id="{{=item.id}}"><i class="fa fa-plus"></i></a>
            </div>
        </li>
    {{ }); }}
</ul>
<ul class="legend element-container">
    <li>
        <i class="fa fa-bookmark"></i> - Promocja
    </li>
    <li>
        <i class="fa fa-smile-o"></i> - Popularny produkt
    </li>
</ul>