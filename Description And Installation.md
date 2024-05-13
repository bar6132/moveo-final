Description:
    Tom, Josh's mentor in JavaScript, prefers remote sessions due to the ongoing Covid situation. He wants to create an online coding web application that allows him to share code with Josh, observe Josh's coding in real-time, and provide guidance.



The application consists of two main pages:
    1.Lobby Page:
        Displays the title "Choose code block" and a list of at least 4 code block items.
        Each code block item represents a specific coding scenario (e.g., "Async case").

    2.Code Block Page:
        Accessed by both the mentor (Tom) and the student (Josh), who are treated as two separate clients.
        The first user to enter the code block page is automatically designated as the mentor, while subsequent users are considered students.
        The mentor sees the chosen code block in read-only mode.
        The student can view and modify the code block.
        Real-time updates to the code block are synchronized between the mentor and student using WebSockets.
        Syntax highlighting is applied to the displayed JavaScript code using a library like Highlight.js.


Technologies Used:
    Node.js
    WebSockets
    React.js
    AWS  

Installation:
    
    Make Sure React + Node.js is installed on you're machine if not follow the steps below:

        Install Node.js: 

            Visit the official Node.js website and download the appropriate installer for your operating system.
            Follow the installation instructions provided by the installer.
            Verify that Node.js and npm (Node Package Manager) are installed correctly by running the following commands in your terminal or command prompt: 
                node --version
                npm --version

        Set up React:

            npm install -g create-react-app 
            npx create-react-app <app name>
            cd <app name>
            npm install (Install Project Dependencies)
            npm start


    If React + Node.js is installed Clone My git repository and install Project Dependencies by doing (npm install) on the root folder and on the websocket-server as well !! 
    
    To start the server:
        1.Enter websocket-server
        2.Enter CMD and type <node index.js>
        3.The server will start on port 3001 <WebSocket>

    To start the client 
        1.On the root folder enter CMD
        2.Type npm run start \ npm start 
        3.The app will start on your browser



    




    
