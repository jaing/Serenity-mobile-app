<div class="container page-bg">
    {{ if (config.state === 'new') { }}
        <h3 data-translate="label.staff.products.new"></h3>
    {{ } else{ }}
        <h3 data-translate="label.product.name.{{=p.id}}"></h3>
    {{}}}

    <form class="form-horizontal" id="{{=_.uniqueId()}}">
        {{ if (config.state != 'new') { }}
            <a href="#" class="btn btn-primary btn-language"><i class="fa fa-flag"></i> <span data-translate="label.staff.selectDifferentLanguage"></span></a>
        {{ } }}

        <input type="hidden" name="id" />
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.name"></label>
            <div class="controls">
                <input type="text" name="name">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.image"></label>
            <div class="controls">
                {{ if (p.image) { }}
                    <img class="img-polaroid" src="{{=p.image}}" alt=""/>
                    <span class="help-block" data-translate="label.staff.product.imageChange"></span>
                <input type="file" name="image"/>
                {{ } else { }}
                    <input type="file" name="image"/>
                {{}}}
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.status"></label>
            <div class="controls">
                <select name="category">
                    {{ _.each(categories, function(item,key) { }}
                        <optgroup data-translate="label.categories.{{=item.id}}"></optgroup>
                        {{ _.each(item.children, function(item,key) { }}
                            <option data-translate="label.categories.{{=item.id}}" value="{{=item.id}}"></option>
                        {{ }); }}
                    {{ }); }}
                </select>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.description"></label>
            <div class="controls">
                <textarea name="body" rows="6"></textarea>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.extendedBody"></label>
            <div class="controls">
                {{ if (p.hasExtendedBody) { }}
                    <textarea name="extendedBody" rows="6"></textarea>
                {{ } else { }}
                    <a class="btn add-extended-body" href="#" data-translate="label.staff.product.addExtendedBody"></a>
                    <textarea name="extendedBody" rows="6" class="hidden"></textarea>
                {{}}}

            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.status"></label>
            <div class="controls">
                <select name="status">
                    <option value="1" data-translate="label.staff.product.available"></option>
                    <option value="0" data-translate="label.staff.product.notavailable"></option>
                </select>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.price"></label>
            <div class="controls">
                <input type="number" name="price" class="input-mini" /> <input type="text" name="currency" data-translate="label.staff.product.currency"/>
                <span class="help-block" data-translate="label.staff.product.priceHelper"></span>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" data-translate="label.staff.product.discount"></label>
            <div class="controls">
                <div class="input-append">
                    <input class="span2" type="number" name="discount">
                    <span class="add-on">%</span>
                </div>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <label class="checkbox">
                    <input type="checkbox" value="true" name="isPromotion"> <span data-translate="label.staff.product.promotion"></span>
                </label>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn btn-large btn-success btn-block" data-translate="label.staff.save"></button>
                <br/>
                <a class="btn btn-inverse" href="#products">
                    <i class="fa fa-angle-left"></i>
                    <span data-translate="label.staff.cancel"></span>
                </a>
            </div>
        </div>
    </form>

</div>