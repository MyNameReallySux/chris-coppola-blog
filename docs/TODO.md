# Project Todo List

## High Priority (Short Term)
TODO(Chris): Add context to Data Sources (pass data to children)  
TODO(Chris): Add router events to redux store  
TODO(Chris): Add menu events to redux store  
TODO(Chris): Split up reducers into smaller reducers

example:
```js
{
    posts: {
        _manifest: { ... },
        ...combineReducers({
            postsList: createReducer(POSTS_STATE, postsReducer),
            activePost: createReducer(POST_STATE, postReducer)
        })
    ),
    categories: {
        _manifest: { ... },
        ...combineReducers({
            categoriesList: createReducer(CATEGORIES_STATE, postsReducer),
            activeCategory: createReducer(CATEGORY_STATE, postsReducer),
        })
    },
    ...
}
```

## Low Priority (Long Term)
TODO(Chris): Create 'smart' versions of each data component  
TODO(Chris): Add Tests for components  
TODO(Chris): Add Tests for redux store  
TODO(Chris): Organize project into a better structure  

current structure:
```
src
    core
        module1
            components 
                smartComponent1:
                    component.jsx
                    componentContainer.js
                ...
                component1.jsx
                component2.jsx
                ...
            moduleActions.js
            moduleReducer.js
            moduleReactions.js
            moduleState.js
            index.js
        module2
        module3
        ...
    libs
    views
        layouts
            app.jsx
        partials
            header.jsx
            main.jsx
            footer.jsx
        routes
            routeWithChildren
                childRoute1.jsx
                childRoute2.jsx
                ...
                index.js
            route1.jsx
            route2.jsx
            ...
```

## Potential Modules
* Cache Control
    * Local Storage Based
    * *Web Worker Based*
* Navigation Components
    * Placeholder
    * Navbar
* Data Source Components
    * Data Source
    * *Filter*