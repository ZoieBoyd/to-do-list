# Task Management Dashboard
A simple, interactive to-do list to organise your life.

![Screen Recording Gif](screenshots/screen-recording.gif)

🌐 [View Live Demo](https://zoieboyd.github.io/to-do-list/) | 
🎨 [View Figma Design Mockup](https://www.figma.com/design/3jhehOV2ycHrYAki0lrGX2/To-Do?node-id=1-2&t=OoRPJhZvJ1eHEdcg-1)

## Features
* Create, edit and delete tasks, projects and notes
* View and check-off to do tasks in their respective project pages
* Three priority levels to indicate importance of each task
* Responsive for desktop and mobile screens
* Data is saved and loaded to preserve it between user sessions

### Potential Improvements
* Improved responsivity on tablet devices
* Sorting and Filtering options for tasks.
* User profiles
* Customisable color themes

## Built Using
### Languages
* HTML
* CSS
* JavaScript
### Build Tool
* Webpack
### Libraries
* date-fns
### Design Tool
* Figma


### SVG Icon Credit
* [SVGRepo | Dazzle Ui](https://www.svgrepo.com/author/Dazzle%20UI/)

## Outcome

## Gallery
<table>
<tr>
    <td align = "center">
        <img src = "screenshots/desktop-screenshot.png" alt = "Desktop screenshot" width = "525"><br>
        <sub>Desktop Preview</sub>
    </td>
    <td align = "center">
        <img src = "screenshots/mobile-screenshot.png" alt = "Google Pixel 7 screenshot" width = "125"><br>
        <sub>Mobile Preview</sub>
    </td>
</tr>
</table>

## Assignment Instructions
[Instructions provided by The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list)
1. Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.

2. Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a title, description, dueDate and priority. You might also want to include notes or even a checklist.

3. Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.

4. You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

5. The look of the User Interface is up to you, but it should be able to do the following:
    1. View all projects.
    2. View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
    3. Expand a single todo to see/edit its details.
    4. Delete a todo.

6. For inspiration, check out the following great todo apps. (look at screenshots, watch their introduction videos etc.)
    1. [Todoist](https://en.todoist.com/)
    2. [Things](https://culturedcode.com/things/)
    3. [any.do](https://www.any.do/)

7. Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
    1. [date-fns](https://github.com/date-fns/date-fns) gives you a bunch of handy functions for formatting and manipulating dates and times.

8. We haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their todos will disappear! You should add some persistence to this todo app using the Web Storage API.
    1. [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) allows you to save data on the user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a function that saves the projects (and todos) to localStorage every time a new project (or todo) is created, and another function that looks for that data in localStorage when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:
        * Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!
        * You can inspect data you saved in localStorage using DevTools! To do this, open the Application tab in DevTools and click on the Local Storage tab under Storage. Every time you add, update and delete data from localStorage in your app, those changes will be reflected in DevTools.
        * localStorage uses [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) to send and store data, and when you retrieve the data, it will also be in JSON format. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!