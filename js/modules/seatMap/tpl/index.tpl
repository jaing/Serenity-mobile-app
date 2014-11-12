<div class="element-container">
    <h2 data-translate="label.seats.selectYourSeat" class="title-label"></h2>
    <h2 data-translate="label.seats.legend" class="title-label small"></h2>
    <div class="seat-legend">
        <ul>
            {{ _.each(legend, function(item,key) { }}
                <li>
                    <span class="{{=item.label}} icon"></span> <span data-translate="label.seats.legend.{{=item.label}}"></span>
                </li>
            {{ }); }}
        </ul>
    </div>
    <table class="seatMap">
        {{ _.each(columns, function(item,key) { }}
        <tr class="{{=item.class}}">
            {{ _.each(item.rows, function(row,row_key) { }}
            <td class="{{=row.class}}" width="{{100/item.rows.length+'%'}}">
                <span class="{{=row.status}}" data-row-id="{{=row.id}}"></span>
            </td>
            {{ }); }}
        </tr>
        {{ }); }}
    </table>
</div>