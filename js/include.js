$(function () {
    includeHTML();

});
//add Rows based on previous columns
function addRow(){
    //Get the last row and then add the next row
    var childLst = arguments.currentTarget.parentElement.children;
    var thisNode = childLst[chldLst.length - 2];
    var cloneNode = $(thisNode).clone(true, true);
    $(cloneNode)
}


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            $.get(file, function (data) {
                $(elem).html(data);
                $(elem).removeAttribute("w3-include-html");
            });
            /* Exit the function: */
            return;
        }
    }
}

function changeLocation(txt) {
    var loc = location.href.substring(0, location.href.lastIndexOf("/"));
    location.href = loc + "/" + txt;
}