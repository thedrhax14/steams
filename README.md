# STEAMS
Following commands were tested only on Mac OS X. If someone finds commands for Windows, then please update README.md file. The project was created and developed using npm V6.8.0, node v10.15.0 and vue v3.3.0. Vue-cli was also used, but not sure what version. It is may be the same as vue.

## Project setup
Make sure you have node.js installed.
```
npm install
```

### Compiles and hot-reloads for development
It only works if you have vue installed. It is recommended to use UI because it is more friendly for the beginners and just easier to manage vue project.
```
vue ui
```
However, if you like code and bash (terminal or command promopt) then check section below.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
This may fix your life problems:) The same function available in the vue ui.
```
npm run lint
```

## Usefull notes
### Component-oriented programming (COP)
Since we are doing components, please everyone read [this](https://vuejs.org/v2/guide/components.html) and check Components in depth. I added one very simple example of it called InstalledPlugins.vue, which can be found in folders "components" and "views". Tomorrow I will finish moving complex auth and popup components, so you could use them as examples or validation of your code.

In particular, learn how to register new components, pass data to components, reuse components in views, create new views and edit router. Don't forget the [basics](https://vuejs.org/v2/guide/index.html) too.

#### General code requirements (Subject to change)
When you design a component, think of its use cases. It have to be flexible, easy to use and reusable.

### Practice
It is reccomended to have local project on personal machine for learning and experimentation purposes.

### Version Control and COP
Even if we are working on different components, we still need to test them, which can be done in two ways. Either create a local project and maintain your own copy of the group project or create your own branch and do whatever you want there. 

Another brain instensive alternative is to rely on the logic and code under assumptions. It is safe for the project, but may be risky for the component you work on.

Files App.vue, rotuer.js, main.js, store.js and firebaseConfig.js are very sensetive. Many things are dependent on them. Consult @thedrhax14 if they needs to be changed.

Don't work in the master branch. If you want push to the branch, please let the team know about it, e.g. make a pull request or contact @thedrhax14.

## FAQ
```
Also I don't get what a pull request means?
```
In simple terms it is a button on the website and in the app, which on click tells collabortors that specific branch is ready to be reviewed and merged with another branch. Very useful when people are working on the file and doing a lot of changes.

```
whats COP?
```
Component-oriented programming. Here is nice [article](https://www.oreilly.com/library/view/programming-net-components/0596102070/ch01s02.html) to read.
