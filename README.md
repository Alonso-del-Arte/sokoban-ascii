# ASCII Sokoban

To play ASCII Sokoban right in your Web browser, go to [the gh-pages](https://alonso-del-arte.github.io/sokoban-ascii/index.html).

Sokoban, 倉庫番(そうこばん, sōkoban) literally "warehouse keeper" is a classic puzzle game that has had many different implementations since the original in the 1980s. There are implementations that you can play online, but, as far as I know, no ASCII-only implementations.

The idea for this project was that it would just be a quick and dirty implementation of Sokoban using HTML, CSS and JavaScript. I thought I would start with ES5, run into trouble, have to refactor to ES6 and still run into problems.

This project has helped clarify certain details in my mind as I set to work on a more structured, object-oriented implementation in Scala. Quick and dirty also means that I wasn't going to be using pure functions or immutable data structures in the JavaScript implementation, or even creating objects for the various game pieces.

This implementation will warn you if a level has too many boxes or too few boxes in regards to goals, but will still let you play a level with a surplus or deficit of boxes. It may even be possible to "win," if the deficiency is of boxes rather than goals. There will be no other indications of problems, such as unmoveable boxes or unreachable goals.

If a board has more than one player token, the last occurring player token will be recognized as such, but the previous player tokens will remain on the board; I make no guarantees whatseover about the functioning of the program in such a situation.

For now there is no single-move undo, but I might implement it later. If you push a box too far, you'll have to refresh (F5) to start over.

I might also do some refactoring, but I'll probably get to a point of deciding this is good enough for quick and dirty and leave it at that. To be honest with you, I'm not terribly concerned about mobile.

I also have this feeling I've gotten dyslexic about coordinates. I've tested this in Firefox, it works, and it should work in Chrome. It might even work in Edge. I make no promises about Internet Explorer.

UPDATE: I tried it in Edge and it works as expected. However, there is one little annoying detail: when you make the final push to get the last box into the goal, Edge displays the congratulation message, but doesn't actually show the last box in the goal until after you dismiss the congratulation message. I will consider pull requests to fix this, but will accept only if it doesn't break the functioning of the program in Firefox.

## Making your own ASCII Sokoban levels

You can use the page for the level Extremely Easy No. 1 as a template, or any of the levels in the `levels` folder. However, `Template.html` and `ExtraTemplate.html` are better for this purporse, because they include indicators to let you know if the CSS and JavaScript are not properly linked.

Be sure to replace the HTML metadata in the Head section, the H1 heading and also the links to previous and next levels.

The most important thing to replace, of course, is the text in the Preformatted tag. The following symbols should appear in varying proportions:

- `#` (pound sign) for wall bricks
- ` ` (space), `-` (dash) or `_` (underscore) for floor tiles (there's no distinguishing between exterior and interior)
- `.` (period) for an empty goal
- `@` (at sign) or `p` (lowercase P) for a player token not on a goal, `+` (plus sign) or `P` (uppercase P) for a player token on a goal; there should only be one of these in a level
- `$` (dollar sign) or `b` (lowercase B) for a box not on a goal, `*` (asterisk) or `B` (uppercase B) for a box on a goal; the total count of goals (regardless of occupancy) should match the total count of boxes (regardless of location)
- `;` (semicolon) at the end of each line (though it may be omitted from the last line)

For example, here's the initial board state for Extremely Easy No. 1:

```
        <pre>#####;
#.$@#;
#####;</pre>
```

If I were to replace it with my Illustrative No. 7, it would look something like this:

```
        <pre> ###### #####;
##.   ###   #;
#+*     *   #;
##  ####** ##;
 ####  $ *  #;
    # ##    #;
    #  ##   #;
    # # $ ###;
    #   # #;
    ##    #;
     ###  #;
       ####;</pre>
```

The semicolons are not standard Sokoban symbols. I use them to simplify parsing the level data. As the carriage returns and line feeds work differently on the different operating systems, I decided it would be best to simply ignore them. Other characters will also be ignored.

The semicolons need not be aligned, but you're certainly welcome to add extra whitespace to align them; this might add processing overhead but it would probably be noticeable only on an already overburdened system (e.g., the Web browser with a hundred open tabs). The semicolon for the last line may be omitted, it will be inferred.

The following elements must also be present, though you have some flexibility as to their placement:

```
        <div id="board"></div>
        <div id="stats"></div>
```

If you place any text in between those tags, it will be overwritten as game play progresses. The following element is optional:

```
        <iframe id="legend" src="../../legend.html" title="Key of Sokoban symbols"></iframe>
```

Subject to the usual `iframe` caveats, this will show a key to the standard Sokoban symbols `@`, `+`, `$`, `*`, `.` and `#`. The URL may need editing.

Be sure to play your level to make sure it works as you expect it to.
