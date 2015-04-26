define(['backbone', 'jquery', 'hbs!Templates/headerApplication', 'hbs!Templates/addSchedule'],
    function(Backbone, $, headerApplicationTemplate, scheduleTemplate) {

        AddScheduleView = Backbone.View.extend({
            template: scheduleTemplate,
            el: $("#applicationContent"),
        
            events: {
                 "click td": "selectDaySection",
                 "click #saveSchedule": "saveSchedule"
            },
            initialize: function() {
            
            var flagSession = localStorage.getItem('sessionActive');
            var userName = localStorage.getItem('names');

            if (flagSession == 1) {
                $('#header').html(headerApplicationTemplate({
                    userName: userName
                }));

                var jsonTemplate = [{
                                        "title": "7:00 - 8:00 am",
                                        "daySectionId": [1,2,3,4,5,6,7]                                     
                                    },
                                    {
                                        "title": "8:00 - 9:00 am",
                                        "daySectionId": [8,9,10,11,12,13,14]                                     
                                    }
                                    ];

                $(this.el).html(this.template({daySections: jsonTemplate}));

                } else {
                    localStorage.clear();
                    window.location.href = "/index.html"
                }
            },
            selectDaySection: function(td) {
                
                if($("tr  .selected#" + td.toElement.getAttribute("id")).length){
                    $(td.toElement).removeClass("selected");        
                }
                else{
                    $(td.toElement).addClass("selected");        
                }
            },
            saveSchedule: function () {

                var daySectionSchedule = new Array();
                
                $("#schedule td.selected").each(function() {
                    daySectionSchedule.push({id : $(this).attr("id")});
                });
                console.log(JSON.stringify(daySectionSchedule));
            }
        });

        return AddScheduleView;

    });