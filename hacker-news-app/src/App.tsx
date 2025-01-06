import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { fetchTopStories } from './features/newsSlice';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchTopStories());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Top 10 Hacker News Stories</h1>
      <ul className="news-list">
        {items.map((item) => (
          <li key={item.id} className="news-item">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title} (Score: {item.score})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;