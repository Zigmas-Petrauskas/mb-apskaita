import bcrypt from 'bcryptjs';
import { pool } from '../database/connection.js';

// Gauti įmonės vartotojus
export const getUsers = async (companyId) => {
  const users = await pool.query(
    `
      SELECT
        users.id,
        users.first_name AS firstName,
        users.last_name AS lastName,
        users.username,
        users.email,
        roles.name AS role
      FROM users
      INNER JOIN roles
        ON users.role_id = roles.id
      WHERE users.company_id = ?
      AND roles.name != 'OWNER'
      ORDER BY users.created_at DESC
    `,
    [companyId],
  );

  return users.map((user) => ({
    ...user,
    id: Number(user.id),
  }));
};

// Sukurti naują vartotoją
export const createUser = async (data, companyId) => {
  const { firstName, lastName, username, email, password } = data;
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
      INSERT INTO users

      (
        company_id,
        role_id,
        first_name,
        last_name,
        username,
        email,
        password_hash
      )

      VALUES
      (?, ?, ?, ?, ?, ?, ?)
    `,

    [companyId, 3, firstName, lastName, username, email, passwordHash],
  );

  return {
    id: Number(result.insertId),
    firstName,
    lastName,
    username,
    email,
    role: 'EMPLOYEE',
  };
};
