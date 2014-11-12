define(['jquery', 'backbone','text!staffModules/_application/tpl/modal.tpl'], function($, Backbone, modaltpl) {

    return Backbone.View.extend({

        events: {

        },

        render: function(template) {

        },
        
        show: function (title,body,buttons) {
            if ($('#modal')) {
                $('#modal').remove();
            }

            var obj = {
                title: title,
                body: body,
                buttons: []
            };

            if (buttons) {
                _.extend(obj,{
                    buttons: buttons
                })
            }

            $('body').append(_.template(modaltpl, obj));

            var btns = $('#modal').find('.modal-footer');
            if (typeof buttons !== 'undefined') {

                $.each(buttons, function(index, val) {

                    var id =_.uniqueId('modal_btn_'),
                        btn = $('<button>', {
                            id: id,
                            class: 'btn ' + (typeof val.class !== 'undefined' ? val.class : ''),
                            'data-translate': val.label
                        });

                    if (typeof val.handler !== 'undefined') {
                        btn.on('click', val.handler);
                    }

                    btns.append(btn);
                });

            }

            $('#modal').modal('show').translate();
        }
    });
});