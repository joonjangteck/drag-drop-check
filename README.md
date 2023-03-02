### Set Up Instruction
- copy and paste the file "default.env" and place it in the "/server" folder
- rename "default.env" in the "/server" folder as ".env"
- add required values in ".env" file
    - values can be found in "Azure Cosmos DB account > Keys" through the Azure portal (endpoint = URI, key = PRIMARY KEY)
- Open the folder "/server" with a Terminal
- type "npm install"
- Open the folder "/client" with a Terminal
- type "npm install"

### Run The Application
- Open the folder "/server" with a Terminal
- type "npm run dev"
- Open the folder "/client" with a Terminal
- type "npm start"