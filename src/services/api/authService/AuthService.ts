import Api from '../Api';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await Api.post('/auth/login', {
      username,
      password
    });

    if (response.status === 200) {
      console.log('Login successful:', response.data);
      return response.data;
    }
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

