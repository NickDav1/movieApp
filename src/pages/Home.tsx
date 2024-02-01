// Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonMenuButton,
  IonButtons,
} from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, bookmarkOutline, sunnyOutline, moonOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Home.css';

const Home: React.FC = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTopMovies();
  }, []);

  const fetchTopMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=30d467376a2a4afbcda126d195e9e968&language=en-US&page=1'
      );
      setTopMovies(response.data.results.slice(0, 15));
    } catch (error) {
      console.error('Error fetching top movies:', error);
    }
  };

  const handleSaveMovie = (movie: any) => {
    const savedMoviesString = localStorage.getItem('savedMovies');
    const savedMovies = savedMoviesString ? JSON.parse(savedMoviesString) : [];

    if (!savedMovies.find((savedMovie: any) => savedMovie.id === movie.id)) {
      savedMovies.push(movie);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <IonPage className={darkMode ? 'dark-mode' : 'light-mode'}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Top Movies</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={toggleDarkMode}>
              <IonIcon icon={darkMode ? sunnyOutline : moonOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={darkMode ? 'dark-mode' : ''}>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3" className="ion-text-center">
              <IonButton routerLink="/saved" color="primary">
                View Saved Movies
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <Swiper
          direction="horizontal"
          spaceBetween={30}
          slidesPerView={1}
          onSwiper={setSwiperInstance}
          navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
        >
          {topMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <IonCard className={`movie-card ${darkMode ? 'dark-mode' : ''}`}>
                <IonCardHeader>
                  <IonCardTitle>{movie.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                  <p><strong>{movie.vote_average.toFixed(1)}/10</strong></p>
                  <p>{movie.overview}</p>
                  <IonButton onClick={() => handleSaveMovie(movie)} className="save-button" expand="full">
                    <IonIcon icon={bookmarkOutline} />
                    Save To Watch Later
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Home;
