<div class="element-container">

    <table class="seatMap">
        {{ _.each(columns, function(item,key) { }}
        <tr class="{{=item.class}}">
            {{ _.each(item.rows, function(row,row_key) { }}
            <td class="{{=row.class}}" width="{{100/item.rows.length+'%'}}">
                <span class="{{=row.status}}" data-row-id="{{=row.id}}" data-order-id="{{=row.order}}"></span>
            </td>
            {{ }); }}
        </tr>
        {{ }); }}
    </table>
    <div class="seat-legend">
        <ul>
            {{ _.each(legend, function(item,key) { }}
            <li>
                <span class="{{=item.label}} icon"></span> <span data-translate="label.seats.legend.{{=item.label}}"></span>
            </li>
            {{ }); }}
        </ul>
    </div>
</div>