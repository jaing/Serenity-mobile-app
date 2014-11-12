<div class="container page-bg">
    <h3 data-translate="label.staff.menu.products.list"></h3>

    <div class="action">
        <a class="btn btn-success" href="#products/add" data-translate="label.staff.add"></a>
        <a class="btn btn-danger" href="#" data-translate="label.staff.deleteSelected"></a>
    </div>
    <form class="filter">
        <fieldset>
            <legend data-translate="label.staff.filter"></legend>
            <div class="content">
                <label data-translate="label.staff.filter.category"></label>
                <select name="category">
                    <option value="" data-translate="label.staff.categories.all"></option>
                    {{ _.each(categories, function(item,key) { }}
                        <optgroup data-translate="label.categories.{{=item.id}}"></optgroup>
                        <option data-translate="label.categories.all" value="{{=item.id}}"></option>
                        {{ _.each(item.children, function(item,key) { }}
                            <option data-translate="label.categories.{{=item.id}}" value="{{=item.id}}"></option>
                        {{ }); }}
                    {{ }); }}
                </select>
                <br/>
                <input type="text" name="search" data-translate="label.staff.filter.name" />
                <br/>
                <button type="submit" class="btn" data-translate="label.staff.search"></button>
            </div>
        </fieldset>
    </form>
    <table class="table">
        <thead>
            <tr>
                <th>#id</th>
                <th data-translate="label.staff.productName"></th>
                <th data-translate="label.staff.productPrice"></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {{ _.each(products, function(item,key) { }}
                <tr class="{{ if (item.status === 0) { }}error{{ } }}">
                    <td>{{=item.id}}<br/><input type="checkbox" value="{{=item.id}}" name="product"  /></td>
                    <td>
                        <a href="#products/edit/{{=item.id}}" class="name">
                            <img class="img-polaroid" src="{{=item.image}}" alt=""/>
                            <span data-translate="label.product.name.{{=item.id}}"></span>
                        </a>
                    </td>
                    <td>
                        <strong>{{=item.price.value.toFixed(2)}} {{=item.price.currency}}</strong>
                    </td>
                    <td>
                        <div class="btn-group pull-right">
                            <a href="#products/edit/{{=item.id}}" class="btn " data-translate="label.staff.edit"></a>
                            <button class="btn btn-inverse dropdown-toggle" data-toggle="dropdown">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="#" data-product-id="{{=item.id}}" data-translate="label.staff.edit"></a></li>
                                <li><a href="#" data-product-id="{{=item.id}}" data-translate="label.staff.delete"></a></li>
                                {{ if (item.status === 0) { }}
                                    <li><a href="#" data-product-id="{{=item.id}}" data-translate="label.staff.enable"></a></li>
                                {{ } else { }}
                                    <li><a href="#" data-product-id="{{=item.id}}" data-translate="label.staff.disable"></a></li>
                                {{}}}

                            </ul>
                        </div>
                    </td>
                </tr>
            {{ }); }}
        </tbody>
    </table>
    <div class="legend">
        <span class="label label-important" data-translate="label.staff.productBlocked"></span>
    </div>
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