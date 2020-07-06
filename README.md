# ASCII Sokoban

WORK IN PROGRESS: This is just going to be a quick and dirty ASCII implementation of Sokoban, using HTML, CSS and JavaScript. I'll start with ES5, will probably run into trouble, have to refactor to ES6 and still run into problems.

I believe these problems will help clarify certain details in my mind as I set to work on a more structured, object-oriented implementation in Scala. Quick and dirty also means that I probably won't be using pure functions or immutable data structures.

This implementation will warn you if a level has too many boxes or too few boxes in regards to goals, but will still let you play. It may even be possible to "win," if the deficiency is of boxes rather than goals. There will be no other indications of problems, such as unmoveable boxes or unreachable goals.

If a board has more than one player token, the last occurring player token will be recognized as such, but the previous player tokens will remain on the board; I make no guarantees whatseover about the functioning of the program in such a situation.

For now there is no undo, but I might implement it later. I might also do some refactoring, but I'll probably get to a point of deciding this is good enough for quick and dirty and leave it at that. To be honest with you, I'm not terribly concerned about mobile.

I also have this feeling I've gotten dyslexic about coordinates. I've tested this in Firefox, it works, and it should work in Chrome. It might even work in Edge. I make no promises whatsoever about Internet Explorer.

## Making your own ASCII Sokoban levels

You can use the level Extremely Easy No. 1 as a template, or any of the levels in the `levels` folder. Be sure to replace the HTML metadata in the Head section, the H1 heading and also the links to previous and next levels.

The most important thing to replace, of course, is the text in the Pre tag. The following symbols should appear in varying proportions:

- `#` for wall bricks
- ` `, `-` or `_` for floor tiles
- `.` for an empty goal
- `@` or `p` for a player token not on a goal, `+` or `P` for a player token on a goal; there should only be one of these in a level
- `$` or `b` for a box not on a goal, `*` or `B` for a box on a goal; the total count of goals (regardless of occupancy) should match the total count of boxes (regardless of location)
- `;` at the end of each line (though it may be omitted from the last line)

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

The semicolons are not standard Sokoban symbols. I use them to simplify parsing the level data. As the carriage returns and line feeds work differently on the different operating systems, I decided it would be best to simply ignore them.

The semicolons need not be aligned, but you're certainly welcome to add extra whitespace to align them; this might add processing overhead but it would probably be noticeable only on an overtaxed system. The semicolon for the last line may be omitted, it will be inferred.

The following elements must also be present, though you have some flexibility as to placement:

```
        <div id="board"></div>
        <div id="stats"></div>
```

If you place any text in between those tags, it will be overwritten as game play progresses. The following element is optional:

```
        <iframe id="legend" src="../../legend.html" title="Key of Sokoban symbols"></iframe>
```

The URL may need editing.
