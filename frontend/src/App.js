import './App.css';
import MainLogin from './Login/MainLogin';
import main from './main';
import {HashRouter , Routes , Route ,Navigate} from "react-router-dom";


function App() {
  return (
    <section className='mainwrapper'>
        <Routes>  
          <Route path='/' element={<Navigate to='/Login' />} />
          <Route path='/Login' Component={ MainLogin} />
          <Route path="/main/*" Component={main} />
        </Routes>
    </section>
  );
}

export default App;
