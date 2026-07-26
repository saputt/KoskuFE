import { mockDb, delay } from '../../api/mockData';

export async function loginApi(email, password) {
  await delay();
  const user = mockDb.getUsers().find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Email atau password salah');
  const { password: _, ...safe } = user;
  return { status: 'success', data: { user: safe, token: `mock-token-${user.id_user}` } };
}

export async function registerApi(data) {
  await delay();
  const users = mockDb.getUsers();
  if (users.find(u => u.email === data.email)) throw new Error('Email sudah terdaftar');
  const newUser = { id_user: users.length + 1, ...data, password: data.password };
  users.push(newUser);
  return { status: 'success', data: { user: { ...newUser, password: undefined } } };
}
