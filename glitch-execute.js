//================================================================================================= GLITCH

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

glitch_exec = {
    /* Global config settings */
    NR_OF_GLITCHED_CANVASES : 7,
    GLITCH_RENDER_COUNT     : 0, /* 0 or negative == glitch indefinitely ; > 0 == glich & few times and stop */
    GLITCH_INTERVAL_PROGRESSIVE : 1,
    GLITCH_INTERVAL_MIN     : 500, /* millisecs */
    GLITCH_INTERVAL_MAX     : 1500, /* millisecs */
    DELAY_BETWEEN_FRAMES    : 30,  /* 30 milisecs delay */
    DELAY_BETWEEN_GLITCHES  : 0,

    rendered_canvases : 0,
    times_rendered    : 0,
    glitched_canvases : Array(),
    curr_canvas       : null,

    __state_machine: function() {
        var gl = glitch_exec;

        /* If we need to render only a few times and stop, return here */
        if (gl.GLITCH_RENDER_COUNT > 0 && gl.times_rendered >= gl.GLITCH_RENDER_COUNT)
            return;

        if (gl.curr_canvas != null) {
            document.body.removeChild(gl.curr_canvas);
        }
        if ((0 < gl.glitched_canvases.length) && (gl.rendered_canvases < gl.glitched_canvases.length)) {
            gl.curr_canvas = gl.glitched_canvases[gl.rendered_canvases];
            document.body.insertBefore(gl.curr_canvas, document.body.firstChild);
            gl.rendered_canvases++;
            setTimeout(gl.__state_machine, gl.DELAY_BETWEEN_FRAMES);
        } else {
            if (gl.GLITCH_RENDER_COUNT > 0 && gl.rendered_canvases >= gl.glitched_canvases.length)
                gl.times_rendered ++;
            gl.rendered_canvases = 0;
            if (gl.DELAY_BETWEEN_GLITCHES > 0)
                setTimeout(gl.__state_machine, gl.DELAY_BETWEEN_GLITCHES);
            else if (gl.GLITCH_INTERVAL_PROGRESSIVE && gl.GLITCH_RENDER_COUNT > 0)
                setTimeout(gl.__state_machine, gl.times_rendered * getRandomInt(500, 1500));
            else
                setTimeout(gl.__state_machine, getRandomInt(gl.GLITCH_INTERVAL_MIN, gl.GLITCH_INTERVAL_MAX));
            gl.curr_canvas = null;
        }
    },

    start: function() {
        var gl = glitch_exec;
        for(var i = 0; i < gl.NR_OF_GLITCHED_CANVASES; ++i) {
            glitch(document.body, {
                amount: i,
                complete: function(canvas) {
                    gl.glitched_canvases.push(canvas);
                    canvas.style.position = "absolute";
                    canvas.style.top = 0;
                    canvas.style.left = 0;
                }
            });
        }
        gl.__state_machine();
    }

};

window.onload = glitch_exec.start;

//================================================================================================= END
