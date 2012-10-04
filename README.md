## Abra-cadabra

Abra-cadabra is a scrolling mosaic that sits in your browser written in Javascript. 
It's perfect for simultaneous demos of images, web pages or just about anything your browser can render.

## Configuration: js/main.js

You can configure the URLs you wish to display by setting:
  
    TILE_URLS

You can also configure a variety of diplay paramters:

    TRANSITION_INTERVAL - how often the tiles scroll
    TRANSITION_DURATION - how fast the tiles scroll
    ANIMATION_INTERVAL - how often to show random animations of tiles
    ANIMATION_DURATION - how fast each random animation should be
    N_TILES_Y - the number of tiles to fit onto the screen vertically
  
## Limitations

Because it uses iframes, Abra-cadabra will only show the top left corner of large pages or will put have large borders around small pages.
Ideal pages will scale dynamically to their container and centre any content.

Though tiles are cycled to from the left side to the right side of the window when they are no longer visible, dynamic pages are likely
to reload due to browser removing and re-adding the iframe element to the DOM.

This has only been tested in Google Chrome. You have been warned.

## Got it?

That's it! Enjoy. =)
