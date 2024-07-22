import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { AddBook } from '../src/screens/admin/addBook';
import './App.css';
import { BookDetails } from './components/BookDetails';
import BooksCatalogue from './components/BooksCatalogue';
import HistoryGrid from './components/HistoryGrid';
import { IssuedBooks } from './components/Issued';
import { RequestBook } from './components/RequestBook';
import { RequestStatus } from './components/requestStatus';
import { SearchBook } from './components/searchBook';
import { AuthContext, AuthProvider } from './context/authProvider';
import { RequestedBooks } from './screens/admin/requestedBooks';
import { UpdateBook } from './screens/admin/updateBook';
import { Dashboard } from './screens/Dashboard';
import { HomePage } from './screens/HomePage';

function App() {

  const { role } = useContext(AuthContext);
 

  return (
    <>

      <div className="App">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{ duration: 3500 }}
        />
        <Router>
          <Routes>

            <Route path="*" element={<Navigate replace to="/" />} />

            <Route path="/" element={<HomePage />}>
              
            </Route>

            {role === 'user' ?
              <>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="/dashboard" element={<Navigate replace to="/dashboard/viewBooks" />} />
                  
                  <Route path="issuedBooks" element={<IssuedBooks />} />
                  <Route path="viewBooks" element={<BooksCatalogue />} />
                  <Route path="viewBooks/bookDetails" element={<BookDetails />} />
                  <Route path="viewBooks/search" element={<SearchBook />} />
                  <Route path="requestBook" element={<RequestBook />} />
                  <Route path="read" element={<HistoryGrid />} />
                  <Route path="requestStatus" element={<RequestStatus />} />
                </Route>
                
              </>
              : role === 'admin' ?
                <>
                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="/dashboard" element={<Navigate replace to="/dashboard/viewBooks" />} />
                    <Route path="viewBooks" element={<BooksCatalogue />} />
                    <Route path="viewBooks/bookDetails" element={<BookDetails />} />
                    <Route path="viewBooks/search" element={<SearchBook />} />

                    <Route path="addBook" element={<AddBook />} />
                    <Route path="viewBooks/updateBook" element={<UpdateBook />} />
                    <Route path="requestedBooks" element={<RequestedBooks />} />
                  </Route>
                </> :
                <>
                  <Route path="*" element={<Navigate replace to="/" />} />
                </>
            }

          </Routes>
        </Router>

      </div>

    </>
  );
}
function MainApp() {
  return (
    <AuthProvider>
      
      <App />
    </AuthProvider>
  )
}

export default MainApp;
