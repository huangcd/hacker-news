export default {
  get: jest.fn((url) => {
    if (url.includes('topstories')) {
      return Promise.resolve({ data: [1, 2] });
    }
    if (url.includes('item/1')) {
      return Promise.resolve({ 
        data: { 
          id: 1, 
          title: 'Test Story 1', 
          url: 'http://example.com/1', 
          score: 100 
        } 
      });
    }
    if (url.includes('item/2')) {
      return Promise.resolve({ 
        data: { 
          id: 2, 
          title: 'Test Story 2', 
          url: 'http://example.com/2', 
          score: 200 
        } 
      });
    }
    return Promise.reject(new Error('Not found'));
  })
};