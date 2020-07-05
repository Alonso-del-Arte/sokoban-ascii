# ASCII Sokoban

WORK IN PROGRESS: This is just going to be a quick and dirty ASCII implementation of Sokoban, using HTML, CSS and JavaScript. I'll start with ES5, will probably run into trouble, have to refactor to ES6 and still run into problems. I believe these problems will help clarify certain details in my mind as I set to work on a more structured, object-oriented implementation in Scala.

Quick and dirty also means that I probably won't be using pure functions or immutable data structures.

This implementation will not provide any warnings for having too many boxes or too few boxes in regards to goals. If a board has more than one player token, the last occurring player token will be recognized as such, but the previous player tokens will remain on the board; I make no guarantees whatseover about the functioning of the program in such a situation.

For now there is no undo, but I might implement it later. I might also do some refactoring, but I'll probably get to a point of deciding this is good enough for quick and dirty and leave it at that.

I also have this feeling I've gotten dyslexic about coordinates.

I've tested this in Firefox and it should work in Chrome. It might even work in Edge. I make no promises whatsoever about Internet Explorer.
