<div class="container page-bg">
    <div class="page-header">
        <h3><span data-translate="label.staff.order"></span> #{{=o.id}} <small>{{=o.user.firstName}} {{=o.user.lastName}}</small></h3>
        {{var dclass;}}
        {{ if (o.status === 0) {dclass="alert-success"} else if(o.status === 1){dclass="alert-info"}else if(o.status === 2){dclass="alert-block"}else if(o.status === 3){dclass="alert-error"} }}
        <div class="alert {{=dclass}}">
            <strong data-translate="label.staff.orderStatus"></strong>: <span data-translate="label.staff.order.status.{{=o.status}}"></span>
        </div>
    </div>
    <div class="row-fluid order-details">
        <div class="span7">
            <h4 data-translate="label.staff.order.details"></h4>
            <ul class="form-list">
                <li class="row-fluid">
                    <div class="span4 text-right"><span data-translate="label.staff.order.room"></span></div>
                    <div class="span8"><strong>{{=o.room}}</strong></div>
                </li>
                <li class="row-fluid">
                    <div class="span4 text-right"><span data-translate="label.staff.orders.fop"></span></div>
                    <div class="span8"><strong data-translate="label.staff.orders.fop.{{=o.fop}}"></strong></div>
                </li>
                <li class="row-fluid">
                    <div class="span4 text-right"><span data-translate="label.staff.orderStatus"></span>:</div>
                    <div class="span8">
                        <select name="status">
                            <option value="0" data-translate="label.staff.order.status.0"></option>
                            <option value="1" data-translate="label.staff.order.status.1"></option>
                            <option value="2" data-translate="label.staff.order.status.2"></option>
                            <option value="3" data-translate="label.staff.order.status.3"></option>
                        </select>
                    </div>
                </li>
                <li class="row-fluid">
                    <div class="span4 text-right"></div>
                    <div class="span8"><a class="btn btn-block btn-success" href="#" data-translate="label.staff.save"></a></div>
                </li>
            </ul>
            <br/><br/>
            <h4 data-translate="label.staff.menu.products.list"></h4>
            <ul class="ul-list prod-list">
                {{ _.each(products, function(item,key) { }}
                    <li class="row-fluid">
                        <div class="span8">
                            <span data-translate="label.product.name.{{=item.id}}"></span>
                        </div>
                        <div class="span4 text-right">
                            {{=item.price.value}} {{=item.price.currency}} <a class="btn btn-danger" href="#"><i class="fa fa-times"></i></a>
                        </div>
                    </li>
                {{ }); }}
            </ul>

        </div>
        <div class="span1"></div>
        <div class="span4">
            <h4 data-translate="label.staff.order.payment"></h4>
            <ul class="price-breakdown">
                <li class="row-fluid total">
                    <div class="span7"><span data-translate="label.staff.orders.toPay"></span></div>
                    <div class="span5 text-right">
                        {{=o.priceTotal.value}} {{=o.priceTotal.currency}}
                    </div>
                </li>
                {{ _.each(products, function(item,key) { }}
                    <li class="row-fluid">
                        <div class="span7"><span data-translate="label.product.name.{{=item.id}}"></span></div>
                        <div class="span5 text-right">
                            {{=item.price.value}} {{=item.price.currency}}
                        </div>
                    </li>
                {{ }); }}
                {{ _.each(o.priceBreakdown, function(item,key) { }}
                    <li class="row-fluid">
                        <div class="span7"><span data-translate="label.staff.orders.price.{{=item.name}}"></span></div>
                        <div class="span5 text-right">
                            {{=item.price.value}} {{=item.price.currency}}
                        </div>
                    </li>
                {{ }); }}
            </ul>
        </div>
    </div>
</div>