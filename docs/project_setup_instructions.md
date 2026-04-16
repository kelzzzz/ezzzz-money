### Project Setup Guide
---
1. Clone the project and checkout the `staging` branch for the latest in-dev code
    - `git checkout -b staging`

2. Create a branch for your work
    - Put your issue # number before your branch's name
    - Ex. `git branch 8888my_branch_name`

3. Download dependencies:
    - Java 17 (Zulu): [Download here](https://www.azul.com/downloads/?version=java-17-lts&package=jdk#zulu)
        - Ensure that your `%JAVA_HOME%` environment variable is set to the directory of your Java 17 JDK
        - Ensure that your JDK is on your `%PATH%`
    - Maven: 3.9.x [Download here](https://maven.apache.org/download.cgi?.)
    - Node: Version 25.x [Download here](https://nodejs.org/en/download)

4. Check your versions and installations with...
    - `java -version`
    - `mvn -v`
    - `npm -v` Should be version 11.x
    - `node -v`

5. Configure VSCode development environment:
    - Download the official Java plugin

6. In your VSCode (or other preferred) terminal, run `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

7. Run `./scripts/up.ps1`. Wait a few seconds, both ends should start up and your browser should open `http://localhost:3000/`, showing you the application.