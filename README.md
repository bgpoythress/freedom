# freedom
A parametric, user friendly CAD program that feels like a game.


FILE STRUCTURE:
---

**freedom.html** - main html file.

**Freedom.js** - Runs the gameLoop and has all the top level objects and variables.  It is the connection between the model and the view.

Contains the following objects/variables:
* canvas object-the webGL drawing surface for HTML5.
* renderer object that handles all the webGL
rendering for the program.
* current state object that get assigned to whatever the current state is.  The current state can be a loading screen, a menu screen, or a model screen.  Maybe more things in the future.
* event handler object that takes all events a passes them down to the model and/or renderer to do things with.
* lastUpdate variable, currentTime variable, and delta variable that are used by the gameLoop to calculate how much time has passed since that last update to the currentState.
* debugging variable which can be turned on or off by the programmer in order to get error outputs on the console.

Contains the following functions:
* main().  No parameters, no returns.
* gameLoop().  No parameters, but is an anonymous function that uses variables defined in main().  Its job is to calculate the elapsed time since the last update, then to update the model, then to render the model, then it calles requestAnimationFrame(gameLoop) to recursively do it again.





