// SavedMovies.tsx
import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { trashOutline } from 'ionicons/icons';

const SavedMovies: React.FC = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch saved movies from local storage
    const savedMoviesString = localStorage.getItem('savedMovies');
    const savedMovies = savedMoviesString ? JSON.parse(savedMoviesString) : [];
    setSavedMovies(savedMovies);
  }, []);

  const handleGoBack = () => {
    history.push('/home');
  };

  const handleRemoveMovie = (movieId: number) => {
    // Remove the movie from the saved list
    const updatedMovies = savedMovies.filter((movie) => movie.id !== movieId);
    setSavedMovies(updatedMovies);

    // Update local storage
    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Saved Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton className="ion-margin-start ion-margin-top" onClick={handleGoBack}>
          Go Back to Home
        </IonButton>
        <IonList>
          {savedMovies.map((movie) => (
            <IonItem key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
              <IonLabel>
                <h2>{movie.title}</h2>
                <p><strong>{movie.vote_average.toFixed(1)}/10</strong></p>
                <p>{movie.overview}</p>
                <IonButton onClick={() => handleRemoveMovie(movie.id)} color="danger">
                  <IonIcon icon={trashOutline} />
                  Remove
                </IonButton>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SavedMovies;
