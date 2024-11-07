var ktt10Btn = null;
var ktt10Floating = null;



var ktt10 = {};
ktt10.webchatUrl = "/";

var ktt10i = document.currentScript.src.indexOf("plugin");
if(ktt10i > -1)
{
    var s = document.currentScript.src.substring(0, ktt10i);
    ktt10.webchatUrl = s;
}

// KIT TO TALK
var ktt10Link = document.createElement("link");
ktt10Link.href = ktt10.webchatUrl + "/plugin.css?v=5";
ktt10Link.type = "text/css";
ktt10Link.rel = "stylesheet";
ktt10Link.media = "screen,print";
document.getElementsByTagName("head")[0].appendChild(ktt10Link);

function ktt10AppendHtml(el, str){
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
}


ktt10.createEvents = function()
{
    ktt10Btn = document.querySelector(".ktt10-btn");
    ktt10Floating = document.querySelector(".ktt10-flt");
    ktt10Close = document.querySelector(".ktt10-close");


    if(ktt10.options.right)
        ktt10Btn.style.setProperty('right', ktt10.options.right, 'important');

    if(ktt10.options.bottom)
        ktt10Btn.style.setProperty('bottom', ktt10.options.bottom, 'important');

    ktt10Btn.onclick = function(e)
    {
        if(ktt10.options.type == "floating")
        {
            var i = document.querySelector("#ktt10-iframe");

            if(!i.getAttribute('src'))
                i.setAttribute('src', i.getAttribute('data-src'));

            if(!ktt10Floating.classList.contains("ktt10-flt2"))
            {
                ktt10Floating.classList.add("ktt10-flt2");
            }
            else
            {
                ktt10Floating.classList.remove("ktt10-flt2");
            }

        }else if(ktt10.options.type == "window")
        {
            window.open(ktt10.newUrl);
        }
    }

    ktt10Close.onclick = function(e)
    {
        ktt10Floating.classList.remove("ktt10-flt2");
    }
}

ktt10.setup = function(options)
{
    if(!options.type)
        options.type = "floating";

    ktt10.options = options;
    ktt10.newUrl = ktt10.webchatUrl + "?";

    if(options.id)
        ktt10.newUrl += "&id=" + options.id;

    if(options.accountId)
        ktt10.newUrl += "&page_id=" + options.accountId;

    if(options.pageId)
        ktt10.newUrl += "&page_id=" + options.pageId;
    
    if(options.hideHeader)
        ktt10.newUrl += "&hideHeader=" + options.hideHeader;

    if(options.showPersona)
        ktt10.newUrl += "&showPersona=" + options.showPersona;
    
    if(options.hideComposer)
        ktt10.newUrl += "&hideComposer=" + options.hideComposer;

    if(options.headerTitle)
        ktt10.newUrl += "&headerTitle=" + encodeURIComponent(options.headerTitle);

    if(options.ref)
        ktt10.newUrl += "&ref=" + encodeURIComponent(options.ref);

    if(options.color)
        ktt10.newUrl += "&color=" + encodeURIComponent(options.color);

    if(options.template)
        ktt10.newUrl += "&template=" + options.template;
    
    if(options.loadMessages !== undefined && options.loadMessages == false)
        ktt10.newUrl += "&lc=0";

    if(options.setCustomFields)
        ktt10.newUrl += "&scf=" + encodeURIComponent(JSON.stringify(options.setCustomFields));

    ktt10.newUrl += '&dm='+window.location.hostname;

    if(options.type == "floating")
    {
        ktt10.htmlBtn = '<button type="button" class="ktt10-btn"><img src="' + ktt10.webchatUrl + '../images/icons/comments-solid.svg" alt="ktt10"></button>';
        ktt10.htmlFlt = '<div class="ktt10-flt"><span class="ktt10-close"><img height="14px" style="height: 14px !important; width: 14px !important" src="' + ktt10.webchatUrl + '../images/icons/cancel.svg"></span><iframe allow="microphone *; allow *" id="ktt10-iframe" data-src="' + ktt10.newUrl + '" class="ktt10-iframe"></iframe></div>';

        ktt10AppendHtml(document.body, ktt10.htmlBtn);
        ktt10AppendHtml(document.body, ktt10.htmlFlt);

        ktt10.createEvents();
    }

    else if(options.type == "container")
    {
        ktt10.htmlFrm = '<iframe allow="microphone *" src="' + ktt10.newUrl + '" class="ktt10-iframe"></iframe>';
        document.querySelector(options.element).innerHTML = ktt10.htmlFrm;
    }

    else if(options.type == "window")
    {
        
        ktt10.htmlBtn = '<button type="button" class="ktt10-btn"><img src="' + ktt10.webchatUrl + '../images/icons/comments-solid.svg" alt="ktt10"></button>';
        ktt10AppendHtml(document.body, ktt10.htmlBtn);

        ktt10.createEvents();
    }

    if(options.color)
    {
        var r = document.querySelector(':root');
        r.style.setProperty('--kttPrimaryColor', options.color);
    }

    if(options.icon)
    {
        var img = document.querySelector('.ktt10-btn img');
        img.src = options.icon;
    }
						
}