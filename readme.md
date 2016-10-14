*WDI9_Major Project #1*

Online URL for completed project:
https://soundtemple.github.io/wdi9_project_one/

Developer: Tim Walter
Last Updated: 14Oct2014
Status:
- Working version with a few bugs
- additional features to be implemented

Project Scope
The project is a twist on the classic snakes and ladders board game.  Logic rules remain the same. A new theme has been applied roughly based on a cult tv series called Firefly. Black holes and time corridors replacing snakes and ladders. Spacehips are trying to get home to Bellerophon with as much money as possible.


Technical Requirements
Completed...
- Render a game in the browser
- Switch turns between two players
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Use Javascript or jQuery for DOM manipulation
- Deploy your game online, where the rest of the world can access it

Bonus Options added
- variable board size
- variable dice size
- variable difficulty (ratio black holes to time corridors)
- customizable player name
- a random planet name generator creates names for all planets, time corridors and black holes each time the game starts.

Unsolved problems
- animating the board moves
- when a move from a Black Hole or Corridor lands on another BlackHole or Corridor

Lessons Learned
- projects are great for improving your knowledge and testing and improving what you know.
- planning and preparation are essential for clean development.
- hard to plan thoroughly as ides, hurdles along the way have a huge influence on development


**technologies used**
- HTML
- css
- JavaScript
- jquery
- photoshop

**the approach taken**
- draw game logic and layout
- build game logic in console
- develop basic presentation using css
- refine game logic add additional features
- fine tune presentation
- commit regularly


### PROJECT DIARY
11OCT
- Project Received
- see info.md for project details
- reviewed project details
- set our deliverable Requirements
- made game choice = SNAKES AND LADDERS
- created local project folders and core files
- created github repo
- Noted #COMPONENTS details to clarify project coding Requirements
- research <canvas> element

12OCT
- basic game logic in console. dice throw, position count for two winners
- board logic updated to include jumps
- game theme idea base snakes and ladders on Firefly series with a space cargo ship theme
- snake and ladders become BlackHoles and time corridors
- test


13OCT
- update game logic, created css board grid and basic layout
- add splash-screen, end-screen features to sit over grid
- test

14OCT
- css styling
- finalise styling. random planet generator
- final css and js mods to display planet info
- test

### COMPONENTS
**data**
- create board
  - X x Y
- create #snakes and ladders
  - determined by #steps on board
  - determine + or - values
- create players

**game_logic**
- alternating clicks by player 1 and player 2
- checking for a win after each click on the board
- check if exact 100 for win

**inputs**
- dice - generates number between 0-7
- generate board and board size.
  - default = 100.
  - rows and columns input
- board win value
  - x*y
- player - name
- score - per player
- board move player to location
- what does each one need to do?
- generate snakes and ladders
  - of each
  - default = 8 ladders 7 snakes
  - move +/- value for each
- reset game

**presentation**
#HTML
- Heading
- score tracking - (update to database)
- player names
- game reset

**twist**
- universe theme
- SNAKES = black holes,
- LADDERS = time corridors
- start at big-bang: end at ??


**move process**
- roll dice
- update player position
- check 100
- check BH or TC
- update GUI

**style**
#CSS
- responsive?
- border divs to create cross grid
- images for
- media queries to change size


**DOM manipulation**
#JavaScript
- clickable squares
