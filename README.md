Description
===========
This script simulates the effect of a transmission glitch.

Current version is quite basic:
* upon load of the webpage it calculates glitched frames and loads them into a buffer
* It then plays those frames several times with progressive delays between animations

It currently does not use any jQuery support. The **glitch-lib.js** does support it however; if you wish to use it, you're free to try it. I decided not to use it. Maybe I'll add later some support for it.

Current limitations
-------------------
Because it's quite a basic script, it has some limitations.

1. The first animations takes several seconds to occur; cause: frames are being computed.
2. Animation neesds tuning; it's rather raw and not 100% convincing.
3. Animation will consist of the same initial frames [because they are computed only once].

Demos:
------
* At [this page](http://93.114.42.133/~sandu/glitch_test/ "Glitch test page")

Praises and recognition
-----------------------
My only contribution is the **glitch-execute.js** code.
All other credit goes to
* [Simon Hewitt](http://sjhewitt.co.uk/2012/07/javascript-glitch-effect-glitch-js/ "Simon Hewitt's page") for the [**glitch.js**](https://github.com/sjhewitt/glitch.js/ "glitch.js source code") library.
* [Niklas von Hertzen](https://github.com/niklasvh "Niklas von Hertzen's page") for the [**html2canvas**](https://github.com/niklasvh/html2canvas "html2canvas.js source code") library.

