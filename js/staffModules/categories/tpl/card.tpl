<div class="container page-bg">
    {{ if (config.state === 'new') { }}
        <h3 data-translate="label.staff.category.new"></h3>
    {{ } else { }}
        <h3 data-translate="label.categories.{{=p.id}}"></h3>
    {{}}}

    <form class="form-horizontal">
        <input type="hidden" name="id" />
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.category.name"></label>
            <div class="controls">
                <input type="text" name="name">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.category.parent"></label>
            <div class="controls">
                <select name="parent">
                    <option value="" data-translate="label.staff.category.noParent"></option>
                    {{ _.each(c, function(item,key) { }}
                        <option value="{{=item.id}}" data-translate="label.categories.{{=item.id}}"></option>
                    {{ }); }}
                </select>
            </div>
        </div>
        {{ if (config.state != 'new') { }}
            <div class="control-group">
                <div class="controls">

                    <div class="alert alert-error">
                        <label class="checkbox">
                            <input type="checkbox" value="true" name="delete"> <strong data-translate="label.staff.category.delete"></strong>
                        </label>
                        <span data-translate="label.staff.category.deleteInfo"></span>
                    </div>
                </div>
            </div>
            <div class="control-group">
                <h4 class="toggle-products" data-translate="label.categories.linkedProducts"></h4>
                <div class="product-list">
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
                            {{ if (products.length > 0) { }}
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
                                        <div class="pull-right">
                                            <a href="#products/edit/{{=item.id}}" class="btn " data-translate="label.staff.edit"></a>
                                        </div>
                                    </td>
                                </tr>
                                {{ }); }}
                            {{ } else { }}
                                <tr>
                                    <td colspan="100%">
                                        <span data-translate="label.staff.noProducts"></span>
                                    </td>
                                </tr>
                            {{}}}

                        </tbody>
                    </table>
                </div>
            </div>
        {{}}}
        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn btn-large btn-success btn-block" data-translate="label.staff.save"></button>
                <br/>
                <a class="btn btn-inverse" href="#categories">
                    <i class="fa fa-angle-left"></i>
                    <span data-translate="label.staff.cancel"></span>
                </a>
            </div>
        </div>
    </form>
</div>