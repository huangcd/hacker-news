import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface NewsItem {
  id: number;
  title: string;
  url: string;
  score: number;
}

interface NewsState {
  items: NewsItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTopStories = createAsyncThunk('news/fetchTopStories', async () => {
  try {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStoryIds = response.data.slice(0, 10);
    const storyPromises = topStoryIds.map((id: number) => 
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );
    const stories = await Promise.all(storyPromises);
    return stories.map(story => story.data);
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopStories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopStories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTopStories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;