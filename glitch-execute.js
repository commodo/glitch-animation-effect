//================================================================================================= GLITCH

/* Global config settings */
var NR_OF_GLITCHED_CANVASES = 7;
var GLITCH_RENDER_COUNT     = 0; /* 0 or negative == glitch indefinitely ; > 0 == glich & few times and stop */
var GLITCH_INTERVAL_PROGRESSIVE = 1;
var GLITCH_INTERVAL_MIN     = 500; /* millisecs */
var GLITCH_INTERVAL_MAX     = 1500; /* millisecs */

var rendered_canvases = 0;
var times_rendered    = 0;
var glitched_canvases = Array();
var curr_canvas = null;

// 30 milisecs delay
var DELAY_BETWEEN_FRAMES = 30;
// 0 means progressively longer with a random delay
// any positive value means a fixed delay
var DELAY_BETWEEN_GLITCHES = 0;

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function do_glitch() {
    for(var i = 0; i < NR_OF_GLITCHED_CANVASES; ++i) {
        glitch(document.body, {
            amount: i,
            complete: function(canvas) {
                glitched_canvases.push(canvas);
                canvas.style.position = "absolute";
                canvas.style.top = 0;
                canvas.style.left = 0;
            }
        });
    }
    render_glitches();
}

function render_glitches() {
    /* If we need to render only a few times and stop, return here */
    if (GLITCH_RENDER_COUNT > 0 && times_rendered >= GLITCH_RENDER_COUNT)
        return;

    if (curr_canvas != null) {
        document.body.removeChild(curr_canvas);
    }
    if ((0 < glitched_canvases.length) && (rendered_canvases < glitched_canvases.length)) {
        curr_canvas = glitched_canvases[rendered_canvases];
        document.body.insertBefore(curr_canvas, document.body.firstChild);
        rendered_canvases++;
        setTimeout(render_glitches, DELAY_BETWEEN_FRAMES);
    } else {
        if (GLITCH_RENDER_COUNT > 0 && rendered_canvases >= glitched_canvases.length)
            times_rendered ++;
        rendered_canvases = 0;
        if (DELAY_BETWEEN_GLITCHES > 0)
            setTimeout(render_glitches, DELAY_BETWEEN_GLITCHES);
        else if (GLITCH_INTERVAL_PROGRESSIVE && GLITCH_RENDER_COUNT > 0)
            setTimeout(render_glitches, times_rendered * getRandomInt(500, 1500));
        else
            setTimeout(render_glitches, getRandomInt(GLITCH_INTERVAL_MIN, GLITCH_INTERVAL_MAX));
        curr_canvas = null;
    }
}

window.onload = do_glitch;

//================================================================================================= END
