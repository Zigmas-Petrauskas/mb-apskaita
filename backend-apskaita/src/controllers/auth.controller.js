import { login } from '../services/auth.service.js';

export const loginUser = async (req, res) => {
  try {
    /*
           Gauname:

           {
               username:"",
               password:""
           }

       */
    const { username, password } = req.body;
    const user = await login(username, password);

    res.status(200).json({ message: 'Prisijungimas sėkmingas', data: user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
