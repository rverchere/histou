/* global _ */

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

//parse arguments
parseArgs()


return function(callback) {

	url = 'http://localhost/histou/index.php';
    configUrl = url+'?host='+host+'&service='+service+debug;

    $.ajax({
        method: 'GET',
        url: configUrl,
        dataType: "jsonp",
    }).done(function(result) {
        console.log(result);
        callback(result);
    }).fail(function(result) {
        console.log(result);
        console.log(configUrl);
        if(result.status == 200){
            callback(createErrorDashboard('# HTTP code: '+result.status+'\n# Message: '+result.statusText+'\n# Url: '+configUrl+'\n# Porbably the output is not valid json, because the returncode is 200!'));
        }else{
            callback(createErrorDashboard('# HTTP code: '+result.status+'\n# Message: '+result.statusText+'\n# Url: '+configUrl));
        }
    });
}

function createErrorDashboard(message) {
    return {
            rows : [{
                title: 'Chart',
                height: '300px',
                panels : [{
                    title: 'Error Message below',
                    type: 'text',
                    span: 12,
                    fill: 1,
                    content: message,
                  }]
            }],
            services : {},
            title : 'JS Error / HTTP Error'
        };
}

function parseArgs() {
    if(!_.isUndefined(ARGS.reduce)) {
        $('head').append('<style>.panel-fullscreen {top:0}</style>');

        //change ui to our needs
        clearUi()
    }
    if(!_.isUndefined(ARGS.host)) {
        host = ARGS.host;
    }else{
        host = "Host0"
    }

    if(!_.isUndefined(ARGS.service)) {
        service = ARGS.service;
    }else{
        service = ""
    }

    if(!_.isUndefined(ARGS.command)) {
        command = ARGS.command;
    }else{
        command = ""
    }

    if(!_.isUndefined(ARGS.perf)) {
        perf = ARGS.perf;
    }else{
        perf = ""
    }

    if(!_.isUndefined(ARGS.height)) {
        height = ARGS.height;
    }else{
        height = "200px"
    }
	
    if(_.isUndefined(ARGS.debug)) {
        debug = '';
    }else{
        debug = "&debug"
    }
}

function clearUi() {
    //removes white space
    var checkExist = setInterval(function() {
         if ($('.panel-content').length) {
            clearInterval(checkExist);
            document.getElementsByClassName("panel-content")[0].style.paddingBottom = '0px';
         }
    }, 100);
    /*
        .panel-header removes the headline of the graphs
        .navbar-static-top removes the menubar on the top
        .row-control-inner removes the row controll button on the left
        .span12 removes the add new row button on the bottom
    */
    divs = ['.panel-header','.navbar-static-top','.row-control-inner','.span12']
    for (index = 0; index < divs.length; index++) {
        waitForDivAndDeleteIt(divs[index]);
    }
    function waitForDivAndDeleteIt(div){
        var checkExist = setInterval(function() {
            if ($(div).length) {
                clearInterval(checkExist);
                $(div).remove();
            }
        }, 100);
    }
}