$(function () {
    includeHTML();
    observeChanges($(".table"));
    $("#addRow").on("click", addRowFunc);
    $("#addCol").on("click", addColFunc);
});

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
                elmnt.innerHTML = data;
                elmnt.removeAttribute("w3-include-html");
                includeHTML();
            });
            return;
        }
    }
}

function changeLocation(txt) {
    var loc = location.href.substring(0, location.href.lastIndexOf("/"));
    location.href = loc + "/" + txt;
}

//Adds a row based on previous columns
function addRowFunc() {
    var parms = arguments;
    //Target: get the last row and then add the next row
    var childLst = parms[0].currentTarget.parentElement.children;
    var node = childLst[childLst.length - 2];
    var clonedNode = $(node).clone(true, true);//TODO initialise the row so all data is not copied as is
    $(clonedNode).insertAfter(node).hide().show('slow');
}

//Adds a columns based on previous columns
function addColFunc() {
    //console.log(parms);
    //Target: get the last row and then add the next row
    var childLst = $("#mainTable")[0].children;
    //Assumption is that each row will have equal number of children
    $.map(childLst, function (val, i) {
        var lstChld = val.children[val.children.length - 2];
        var clnlstChld = $(lstChld).clone(true, true);
        $(clnlstChld).insertAfter(lstChld).hide().show('slow');
    })
    var leftPos = $("#mainTable").parent().scrollLeft();
    //$("#mainTable").parent().scrollLeft(leftPos + 200);
    $("#mainTable").parent().animate({scrollLeft: leftPos + 200}, 800);

}

// Callback function to execute when mutations are observed
var observationCallback = function (mutationsList, observer) {
    //for (var mutation of mutationsList) {
    $.map(mutationsList, function (mutation, i) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
            //console.log(mutation);
            var targetTable = $(mutation.target)[0];
            if (targetTable.id === "") {
                targetTable = targetTable.parentElement;
            }
            $.map(targetTable.children, function (child, i) {
                if (i == 0) {
                    //TODO for further processing
                } else {
                    {
                        $.each(child.children, function (l, subChild) {
                            if (subChild.type !== "button") {
                                if (i % 2 == 1) {
                                    if (!subChild.firstElementChild || subChild.firstElementChild.localName !== "button") {
                                        $(subChild).removeClass("bg-primary").addClass("bg-primary");
                                    }
                                } else {
                                    $(subChild).removeClass("bg-primary");
                                }
                            }
                        });
                    }
                }
            });
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    });
};

function observeChanges(node) {
    if (node.length == 0) {
        return;
    }
    // Options for the observer (which mutations to observe)
    var config = {attributes: true, childList: true, subtree: true};
    var observer = new MutationObserver(observationCallback);
    // Start observing the target node for configured mutations
    observer.observe(node[0], config);
}
