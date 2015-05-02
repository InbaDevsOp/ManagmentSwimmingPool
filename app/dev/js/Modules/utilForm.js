define(['jquery'],
    function($) {
        
        utilForm = {

             serializeFormToJson : function(formSelector) {
                    var jsonData = {};
                    var formData = $(formSelector).serializeArray();
                    $.each(formData, function() {
                        if (jsonData[this.name]) {
                            if (!jsonData[this.name].push) {
                                jsonData[this.name] = [jsonData[this.name]];
                            }
                            jsonData[this.name].push(this.value || '');
                        } else {
                            jsonData[this.name] = this.value || '';
                        }

                    });
                    return jsonData;
            },
            serializeFormToObject : function(formSelector) {
                
                var selector = $(formSelector).serializeArray();
                var object = {};
                for (var i in selector) {
                    object[selector[i].name] = selector[i].value;
                }
                return object;
            }

        }

        return utilForm;
});
