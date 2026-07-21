import bcrypt from 'bcryptjs';
import { pool } from '../database/connection.js';

export const createCompany = async (company, owner) => {
  let connection;

  try {
    connection = await pool.getConnection();

    /*
      Pradedame transakciją.

      Jeigu kažkas nepavyks:
      - company nebus sukurta
      - user nebus sukurtas

    */

    await connection.beginTransaction();

    /*
      1. Sukuriame įmonę
    */

    const companyResult = await connection.query(
      `
      INSERT INTO companies
      (
        name,
        company_code,
        vat_code,
        address,
        phone,
        email
      )

      VALUES (?, ?, ?, ?, ?, ?)

      `,
      [
        company.name,
        company.code,
        company.vatCode || null,
        company.address,
        company.phone || null,
        company.email || null,
      ],
    );

    const companyId = Number(companyResult.insertId);

    /*
      2. Randame OWNER rolę
    */

    const roles = await connection.query(
      `
      SELECT id
      FROM roles
      WHERE name = 'OWNER'
      `,
    );

    if (roles.length === 0) {
      throw new Error('OWNER rolė nerasta');
    }

    const ownerRoleId = roles[0].id;

    /*
      3. Sukuriame slaptažodžio hash

      Pvz:

      12345678

      tampa:

      $2b$10$....

    */

    const passwordHash = await bcrypt.hash(owner.password, 10);

    /*
      4. Sukuriame pirmą vartotoją

      OWNER

    */

    const userResult = await connection.query(
      `
      INSERT INTO users
      (
        company_id,
        role_id,
        first_name,
        last_name,
        username,
        email,
        phone,
        password_hash
      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?)

      `,
      [
        companyId,
        ownerRoleId,
        owner.firstName,
        owner.lastName,
        owner.username,
        owner.email,
        owner.phone || null,
        passwordHash,
      ],
    );

    await connection.commit();

    return {
      company: {
        id: companyId,
        name: company.name,
      },

      owner: {
        id: Number(userResult.insertId),
        username: owner.username,
        role: 'OWNER',
      },
    };
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
