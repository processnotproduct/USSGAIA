//variable that will increment through the images

var step = 1
var whichimage = 1
function slideit() {
    if (!document.images)
        return
    document.images.slide.src = eval("image" + step + ".src")
    whichimage = step
    if (step < 5)
        step++
    else
        step = 1
    setTimeout("slideit()", 3800)
}
slideit()
function slidelink() {
    if (whichimage == 1)
        window.location = ""
    else if (whichimage == 2)
        window.location = ""
    else if (whichimage == 3)
        window.location = ""
    else if (whichimage == 4)
        window.location = ""
}