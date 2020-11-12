import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/navbar.component';
import InterviewList from './components/interview-list.component';
import InterviewCreate from './components/interview-create.component';
import InterviewEdit from './components/interview-edit.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
        <Navbar />

        <Route path="/" exact component={InterviewList} />
        <Route path="/create" component={InterviewCreate} />
        <Route path="/edit/:id" component={InterviewEdit} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
