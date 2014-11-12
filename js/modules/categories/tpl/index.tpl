<label for="categories" data-translate="label.global.categories" class="title-label"></label>
<div class="b-select">
    <div class="component">
        <div class="value">
            <span data-translate="label.global.choose"></span>
        </div>
        <a class="trigger" href="#">
            <i class="fa fa-angle-down"></i>
        </a>
    </div>

    <select id="categories">
        {{ _.each(categories, function(item,key) { }}
        <optgroup data-translate="label.categories.{{=item.id}}"></optgroup>
        <option data-translate="label.categories.all" value="{{=item.id}}"></option>
        {{ _.each(item.children, function(item,key) { }}
        <option data-translate="label.categories.{{=item.id}}" value="{{=item.id}}"></option>
        {{ }); }}
        {{ }); }}
    </select>
</div>
