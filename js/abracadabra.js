/*
Copyright (c) 2012 http://github.com/chetbox

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

// This is probably all you need to edit
var TRANSITION_INTERVAL = 4000;
var TRANSITION_DURATION = 2000;
var ANIMATION_DURATION = 1000;
var N_TILES_Y = 3;

var TILE_X_PROPORTION = -1;
var TILE_Y_PROPORTION = 1 / N_TILES_Y;
var N_TILES_X = -1;
var N_TILES = -1;
var ANIMATIONS = [
    { animate: { rotateX: '360deg' }, reverse: { rotateX: '0deg' } },
    { animate: { rotateX: '-360deg' }, reverse: { rotateX: '0deg' } },
    { animate: { rotateY: '360deg' }, reverse: { rotateY: '0deg' } },
    { animate: { rotateY: '-360deg' }, reverse: { rotateY: '0deg' } },
    { animate: { rotate: '360deg' }, reverse: { rotate: '0deg' } },
    { animate: { rotate: '-360deg' }, reverse: { rotate: '0deg' } },
]



var tile_number = 0;

function create_tile(urls, parent, width, tile_number) {

    tile_class = tile_number % urls.length;

    var tile = $('<div />');
    tile
        .addClass('tile')
        .addClass('t' + tile_number)
        .addClass('type' + tile_class)
        .css('height', (TILE_Y_PROPORTION * 100) + '%')
        .appendTo( parent )
        .css('width', width)
        .append( $('<iframe />')
            .attr('scrolling', 'no')
            .attr('src', urls[tile_class]))
    return tile;
}

function transition(container) {
    var animation_set = false;

    var to_move = $('.tile-container')
    var displacement = - to_move.first().outerWidth(true)
    $('.tile-container')
        .transition({
            x: displacement + 'px'
        }, TRANSITION_DURATION, function() {
            $(this)
                .transition({
                    x: 0
                }, 0)
                .first()
                    .appendTo(container)

            if ( !animation_set && ANIMATION_DURATION > 0 ) {
                animate_random();
                animation_set = true;
            }

        })
}

function set_dimensions(urls, container) {

    // create a temporary tile to work out the ideal size
    var test_tile = create_tile(urls, container)
        .addClass('test')

    var html_width = $('html').width();
    TILE_X = test_tile.height();
    N_TILES_X = Math.floor( html_width / TILE_X );
    N_TILES = N_TILES_X * N_TILES_Y;

    test_tile.remove();


    // update existing tile widths
    $('.tile, .tile-container')
        .css('width', TILE_X + 'px')


    // centre tiles
    var offset = TILE_X - (html_width % TILE_X)/2;
    container.transition({
        x: (-offset) + 'px'
    })

}

function animate_random() {
    var animation = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];
    var potential_tiles = $('.tile-container').slice(1, -2).find('.tile')
    var tile = potential_tiles[Math.floor(Math.random() * potential_tiles.length)];

    console.log(tile)
    $(tile)
        .transition(animation.reverse, 0, function() {
            $(tile).transition(animation.animate, ANIMATION_DURATION, 'in-out', function() {
                $(tile).transition(animation.reverse, 0)
            })
        })
}

$(function() {
    var container = $('#abracadabra-container');

    // get a list of all URLs to display
    var urls = container.children().map(function() {
        return $(this).attr('src');
    });

    container.empty();

    set_dimensions(urls, container)

    for (var i=0; i<N_TILES_X+3; i++) {
        var tile_container = $('<div />')
            .addClass('tile-container')
            .css('width', TILE_X + 'px')
            .appendTo(container)

        for (var j=0; j<N_TILES_Y; j++) {
            create_tile(urls, tile_container, TILE_X, tile_number);
            tile_number++;
        }
    }

    if (TRANSITION_INTERVAL) {
        setInterval(function() { transition(container) }, TRANSITION_INTERVAL);
    }

    $(window).resize(function() { set_dimensions(urls, container) })
});
