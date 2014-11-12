<div class="container page-bg">
    <div id="seat-map"></div>
    <h3 data-translate="label.staff.menu.orders.list"></h3>
    <table class="table table-tr-click">
        <thead>
        <tr>
            <th data-translate="label.staff.orders.when"></th>
            <th data-translate="label.staff.orders.room"></th>
            <th data-translate="label.staff.orders.totalPrice"></th>
            <th data-translate="label.staff.orders.status"></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {{ _.each(orders, function(item,key) { }}
            <tr class="status-{{=item.status}} status" data-order-id="{{=item.id}}">
                <td>{{=item.date}}</td>
                <td><strong>{{=item.room}}</strong>
                <div class="user">{{=item.user.firstName}} {{=item.user.lastName}}</div></td>
                <td>
                    <span class="price"><strong>{{=item.priceTotal.value}} {{=item.priceTotal.currency}}</strong></span>
                    <div class="fop">
                        <span data-translate="label.staff.orders.fop"></span>
                        <span data-translate="label.staff.orders.fop.{{=item.fop}}"></span>
                    </div>
                </td>
                <td><strong data-translate="label.staff.order.status.{{=item.status}}"></strong>
                    <div>
                        <span data-translate="label.staff.order.supports"></span>
                        <span>{{=item.staff}}</span>
                    </div>
                </td>
                <td><a class="btn" href="#orders/edit/{{=item.id}}" data-translate="label.staff.edit"></a></td>
            </tr>
        {{ }); }}
        </tbody>
    </table>

    <div class="pagination pagination-centered">
        <ul>
            <li><a href="#">«</a></li>
            <li class="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">»</a></li>
        </ul>
    </div>
</div>