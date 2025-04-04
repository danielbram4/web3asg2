import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { supabase } from './Supabase/supabaseClient.js'
import LoginPage from "./components/LoginPage/LoginPage.jsx"
import './App.css'
import NotFound from './components/NotFound.jsx'
import GalleryView from './components/GalleryView/GalleryView.jsx'
import ArtistView from './components/ArtistView/ArtistView.jsx'
import GenreView from './components/GenreView/GenreView.jsx'
import PaintingView from './components/PaintingView/PaintingView.jsx'
import NavBar from './components/NavBar.jsx'
import FooterBar from './components/FooterBar.jsx'
import AboutPage from './components/AboutPage/AboutPage.jsx'

function Layout({ children, favourites, setFavourites}) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Only render NavBar if not on the login page */}
      {!isLoginPage && <NavBar favourites={favourites} setFavourites={setFavourites} />}
      <div className="flex-grow overflow-hidden flex flex-col">
        {children}
      </div>
      {/* Only render FooterBar if not on the login page */}
      {!isLoginPage && <FooterBar />}
    </div>
  );
}

function App() {
  const [galleries, setGalleries] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);  
  const [paintinggenres, setPaintingGenres] = useState([]);
  const [eras, setEras] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch galleries
  useEffect(() => {
    async function fetchGalleries() {
      try {
        const { data, error } = await supabase.from('galleries').select('*');
        if (error) throw error;
        setGalleries(data);
      } catch (error) {
        console.error('Error fetching galleries: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleries();
  }, []);

  // Fetch paintings
  useEffect(() => {
    async function fetchPaintings() {
      try {
        const { data, error } = await supabase.from('paintings').select('*');
        if (error) throw error;
        const paintingsWithThumbnails = data.map(painting => ({
          ...painting,
          thumbnailUrl: `https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${painting.imageFileName
            .toString()
            .padStart(6, '0')}.jpg`
        }));
        setPaintings(paintingsWithThumbnails);
      } catch (error) {
        console.error('Error fetching paintings: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPaintings();
  }, []);

  // Fetch artists
  useEffect(() => {
    async function fetchArtists() {
      try {
        const { data, error } = await supabase.from('artists').select('*');
        if (error) throw error;
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }, []);

  // Fetch genres 
  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data, error } = await supabase.from('genres').select('*');
        if (error) throw error;
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  // Fetch painting genres
  useEffect(() => {
    async function fetchPaintingGenres() {
      try {
        const { data, error } = await supabase.from('paintinggenres').select('*');
        if (error) throw error;
        setPaintingGenres(data);
      } catch (error) {
        console.error('Error fetching painting genres: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPaintingGenres();
  }, []);

  // Fetch eras
  useEffect(() => {
    async function fetchEras() {
      try {
        const { data, error } = await supabase.from('eras').select('*');
        if (error) throw error;
        setEras(data);
      } catch (error) {
        console.error('Error fetching eras: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEras();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-100">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <BrowserRouter>
      <Layout favourites={favourites} setFavourites={setFavourites}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/galleries" element={<GalleryView galleries={galleries} paintings={paintings} artists={artists} favourites={favourites} setFavourites={setFavourites} />} />
          <Route path="/artists" element={<ArtistView artists={artists} paintings={paintings} favourites={favourites} setFavourites={setFavourites} />} />
          <Route path="/genres" element={<GenreView genres={genres} paintings={paintings} artists={artists} paintinggenres={paintinggenres} favourites={favourites} eras={eras} setFavourites={setFavourites} />} />
          <Route path="/paintings" element={<PaintingView paintings={paintings} artists={artists} galleries={galleries} favourites={favourites} setFavourites={setFavourites} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;