I intend to open this project to Hacktoberfest 2023

# Contributing guidelines for Hacktoberfest

NOTE: The default branch was originally named master. It's now main. If you forked prior to that change, please take the appropriate option to realign the branch names.

Pull requests should generally correspond to open issues. You may file issues, but I'm free to close them as "won't fix" at my discretion. Pull requests should always be for the main branch. I'll decide when to update the gh-pages branch.

As this is supposed to be quick and dirty, I'm not interested in moving to ES6 or any later versions of JavaScript.

CSS should be limited to standard features available in the major Web browsers (Chrome, Edge, Firefox, Opera, Safari) without special prefixes (`-moz`, `-ms`, `-o`, `-webkit`).

HTML5 for the most part but XHTML 1.0 and 1.1 are acceptable.

Maybe vector graphics are okay, but definitely don't use any raster graphics.

## New levels

If you wish to add a level, it must be a level with at least one valid solution. Except for an extremely easy level with a very obvious solution, the existence of a solution must be proven either by stating the solution (use the `div.solution` style) or by posting the level on game-sokoban.com and showing that at least one visitor to that website has been able to solve it.

Also, the level must have only one player token (pusher) and the number of boxes must match the number of goals. However, template levels must have two player tokens and more goals than boxes. Though I'm not too keen to add template levels.
