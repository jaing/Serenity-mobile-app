<div class="container page-bg">
    <h3 data-translate="label.staff.menu.categories.list"></h3>
    <div class="action">
        <a class="btn btn-success" href="#categories/add" data-translate="label.staff.add"></a>
    </div>
    <ul class="categories-list ul-list">
        {{ _.each(c, function(item,key) { }}
            <li>
                <div class="row-fluid">
                    <div class="span8 name">
                        <span data-translate="label.categories.{{=item.id}}"></span>
                    </div>
                    <div class="span4 text-right">
                        <a href="#categories/edit/{{=item.id}}" class="btn btn-inverse" data-translate="label.staff.edit"></a>
                    </div>
                </div>

                <ul>
                    {{ _.each(item.children, function(item,key) { }}
                        <li>
                            <div class="row-fluid">
                                <div class="span8">
                                    <i class="fa fa-angle-right"></i> <span data-translate="label.categories.{{=item.id}}"></span>
                                </div>
                                <div class="span4 text-right">
                                    <a href="#categories/edit/{{=item.id}}" class="btn btn-mini" data-translate="label.staff.edit"></a>
                                </div>
                            </div>
                        </li>

                    {{ }); }}
                </ul>

            </li>
        {{ }); }}
    </ul>
</div>