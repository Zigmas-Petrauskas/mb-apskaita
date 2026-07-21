import bcrypt from 'bcryptjs';
import { pool } from '../database/connection.js';

export const login = async (username, password) => {
  /*
    Prisijungimo eiga:

    1. Randame vartotoją pagal username
    2. Paimame password_hash
    3. Tikriname bcrypt
    4. Grąžiname vartotojo duomenis
  */

  const users = await pool.query(
    `
      SELECT 
        users.id,
        users.username,
        users.email,
        users.password_hash,
        users.two_factor_enabled,
        roles.name AS role

      FROM users

      INNER JOIN roles
        ON users.role_id = roles.id

      WHERE users.username = ?
    `,
    [username],
  );

  console.log('Login DB rezultatas:', users);

  if (users.length === 0) {
    throw new Error('Neteisingi prisijungimo duomenys');
  }

  const user = users[0];

  const passwordValid = await bcrypt.compare(password, user.password_hash);

  if (!passwordValid) {
    throw new Error('Neteisingi prisijungimo duomenys');
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    twoFactorRequired: user.two_factor_enabled,
  };
};
