# Tic-Tac-Toe-Game

# How to run a project
To run application, open terminal in the root directory and run the following command: docker-compose up --build.

To stop the running containers, press Ctrl+C in the terminal where you run docker-compose up.

# Architecture considerations
-The forntend is built using React + Vite.
-The backend: Node.js + Express web framework
-For database is used MongoDB
-The fontend communicates with backend through HTTP requests and for live result is used socket.io.
-The application is containerized using Docker

# Relevant details
To play multi-players game, two users need to log in at the same time, and always the player who created the game playes first and his sing is "X".

Only the results of games with a winner are saved.


