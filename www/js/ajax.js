$.extend(
{
    ajaxForm: function(formID, callback)
    {
        form = $(formID); 
        var options = 
        {
            target  : null,
            timeout : 30000,
            dataType:'json',

            success: function(response)
            {
                $.enableForm(formID);

                /* The response is not an object, some error occers, bootbox.alert it. */
                if($.type(response) != 'object')
                {
                    if(response) return bootbox.alert(response);
                    return bootbox.alert('No response.');
                }

                /* The response.result is success. */
                if(response.result == 'success')
                {
                    if($.isFunction(callback)) return callback(response);
                    if($('#responser').length && response.message && response.message.length)
                    {
                        $('#responser').html(response.message).addClass('text-error f-12px').show().delay(3000).fadeOut(100);
                    }

                    if(response.locate) return location.href = response.locate;
                }

                /**
                 * The response.result is fail. 
                 */

                /* The result.message is just a string. */
                if($.type(response.message) == 'string')
                {
                    if($('#responser').length == 0) return bootbox.alert(response.message);
                    return $('#responser').html(response.message).addClass('text-error f-12px').show().delay(5000).fadeOut(100);
                }

                /* The result.message is just a object. */
                if($.type(response.message) == 'object')
                {
                    $.each(response.message, function(key, value)
                    {
                        /* Define the id of the error objecjt and it's label. */
                        var errorOBJ   = '#' + key;
                        var errorLabel =  key + 'Label';

                        /* Create the error message. */
                        var errorMSG = '<label id="'  + errorLabel + '" class="text-error">';
                        errorMSG += $.type(value) == 'string' ? value : value.join(';');
                        errorMSG += '</label>';

                        /* Append error message, set style and set the focus events. */
                        $('#' + errorLabel).remove(); 
                        $(errorOBJ).parent().append(errorMSG);
                        $(errorOBJ).css('margin-bottom', 0);
                        $(errorOBJ).css('border-color','#953B39')
                        $(errorOBJ).focus(function()
                        {
                            $(this).removeAttr('style')
                            $('#' + errorLabel).remove(); 
                        });
                    })
                }
            },

            /* When error occers, alert the response text, status and error. */
            error: function(jqXHR, textStatus, errorThrown)
            {
                $.enableForm(formID);
                bootbox.alert(jqXHR.responseText + textStatus + errorThrown);
            }
        };

        /* Call ajaxSubmit to sumit the form. */
        form.submit(function()
        { 
             $(this).ajaxSubmit(options);
             return false;    // Prevent the submitting event of the browser.
        });
    },

    /* Disable a form. */
    disableForm: function(formID)
    {
        $(formID).find(':submit').attr('disabled', true);
    },
    
    /* Enable a form. */
    enableForm: function(formID)
    {
        $(formID).find(':submit').attr('disabled', false);
    }
});

$.extend(
{
    /**
     * Load a page into a target through ajax.
     *
     * @param string selector
     * @param string target
     */
    ajaxLoad: function(selector, target)
    {
        var target = $(target);
        if(!target.size()) return false;

        $(document).on('click', selector, function()
        {
            url = $(this).attr('href');
            if(!url) url = $(this).data('rel');
            if(!url) return false;

            target.load(url);

            return false;
        });
    },

    /**
     * Load some json data through ajax..
     *
     * 
     * @param string   selector
     * @param object   callback
     */
    ajaxJSON: function(selector, callback)
    {
        $(document).on('click', selector, function()
        {
            /* Try to get the href of current element, then try it's data-rel attribute. */
            url = $(this).attr('href');
            if(!url) url = $(this).data('rel');
            if(!url) return false;
            
            $.getJSON(url, function(response)
            {
                /* If set callback, call it. */
                if($.isFunction(callback)) return callback(response);

                /* If the response has message attribute, show it in #responser or alert it. */
                if(response.message)
                {
                    if($('#responser').length)
                    {
                        $('#responser').html(response.message);
                        $('#responser').addClass('text-info f-12px');
                        $('#responser').show().delay(3000).fadeOut(100);
                    }
                    else
                    {
                        bootbox.alert(response.message);
                    }
                }

                /* If target and source returned in reponse, update target with the source. */
                if(response.target && response.source)
                {
                    $(response.target).load(response.source);
                }
            });

            return false;
        });
    },

    /**
     * reloadAjaxModal.
     *
     * @access public
     * @return void
     */
    reloadAjaxModal: function()
    {
        $('#ajaxModal').load($('#ajaxModal').attr('rel'));
    },

    /**
     * Ajax delete.
     * 
     * @param  object $event 
     * @access public
     * @return void
     */
    ajaxDelete: function (event)
    {
        if(confirm(v.lang.confirmDelete))
        {
            var target = $(event.target);
            target.text(v.lang.deleteing);

            $.getJSON(target.attr('href'), function(data) 
            {
                if(data.result=='success')
                {
                    return target.is('#ajaxModal a.delete') ? $.reloadAjaxModal() : location.reload();
                }
                else
                {
                    alert(data.message);
                }
            });
        }
        return false;
    },

    /**
     * Add ajaxModal container if there's an <a> tag with data-toggle=modal.
     * 
     * @access public
     * @return void
     */
    ajaxModal: function()
    {
        if($('a[data-toggle=modal]').size() == 0) return false;

        /* Addpend modal div. */
        var div = $('<div id="ajaxModal" class="modal hide fade" tabindex="-1"></div>');
        div.appendTo('body');

        /* Set the data target for modal. */
        $('a[data-toggle=modal]').attr('data-target', '#ajaxModal');

        $('a[data-toggle=modal]').click(function()
        {
            /* Save the href to rel attribute thus we can save it. */
            $('#ajaxModal').attr('rel', $(this).attr('href'));

            /* Set the width and margin of modal. */
            modalWidth      = 580;
            modalMarginLeft = 280;
            
            /* User can customize the width by data-width=600. */
            if($(this).data('width'))
            {
                modalWidth  = parseInt($(this).data('width')); 
                modalMarginLeft = (modalWidth - 580) / 2 + 280;
            }

            /* Set the width and margin-left styles. */
            $('#ajaxModal').css('width',modalWidth);
            $('#ajaxModal').css('margin-left', '-' + modalMarginLeft + 'px')

            /* Load the target url in modal. */
            $('#ajaxModal').load($(this).attr('href')); 
        });  
    }
});
