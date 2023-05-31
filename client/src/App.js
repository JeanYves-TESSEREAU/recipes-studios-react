import React from 'react';
import { Route, Routes } from 'react-router-dom';

import store from './store.js';
import { Provider } from 'react-redux';
import AlimentsBoard from './components/Studios/AlimentBoard/AlimentsBoard.jsx';
import RecipeStudio from './components/Studios/RecipeStudio/RecipeStudio.jsx';
import RecipeBook from './components/Studios/RecipeBook/RecipeBook.jsx';
import Home from './components/Home/Home.jsx';
import Connexion from './components/Connexion/Connexion.jsx';
import Recipe from './components/multiFonctionComponents/Recipes/Recipe/Recipe';
// import PublicRoute from './components/Routes/PublicRoute.jsx';

function App() {
  window.onbeforeunload = function () {
    // setTimeout(() => {
    window.scrollTo(0, 0);
    // }, 10);
  };

  return (
    <div className='App'>
      <Provider store={store}>
        <Routes>
          <Route exact path='/' element={<Home />} />

          {/* <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/login" component={Login} /> */}
          <Route path='/connection' element={<Connexion />} />

          {/* <Route exact path='/studios' element={<Studios />} /> */}
          <Route path='/aliments-studio' element={<AlimentsBoard />} />
          <Route path='/recettes-studio' element={<RecipeStudio />} />
          <Route path='/recettes-book' element={<RecipeBook />} />
          <Route path='/recipe' element={<Recipe />} />

          {/* Private Routes */}
          {/* <PrivateRoutes /> */}

          {/* <Route to="/404" component={NotFound} /> */}
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

// IMPORTANT !!!!  NEW REACT ROUTER DOM VERSION WITH "ROUTES" NOT ACCEPT OTHER CHILDS THAT "ROUTE" AS THE CODE BELLOW  !!!!!!!!!!!!

// function App() {
//   return (
//     <div className='App'>
//       <Provider store={store}>
//         <Router>
//           <Routes>
//             <Route exact path='/' component={Home} />
//             {/* <PublicRoute path="/register" component={Register} />
//           <PublicRoute path="/login" component={Login} /> */}
//             {/* <PublicRoute path="/about" component={About} /> */}

//             <PublicRoute exact path='/studios' component={Studios} />
//             <PublicRoute
//               path='/studios/aliments-studio'
//               component={AlimentsBoard}
//             />
//             <PublicRoute
//               path='/studios/recettes-studio'
//               component={RecipeStudio}
//             />
//             <PublicRoute path='/studios/recettes-book' component={RecipeBook} />

//             {/* Private Routes */}
//             {/* <PrivateRoutes /> */}

//             {/* <Route to="/404" component={NotFound} /> */}
//           </Routes>
//         </Router>
//       </Provider>
//     </div>
//   );
// }

// export default App;
