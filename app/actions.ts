'use server';

import { deleteUserById } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { addUser } from '@/lib/db';

export async function deleteUser(userId: number) {
  try {
    await deleteUserById(userId);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
}

export async function handleAddUser(data: { name: string; username: string; email: string }) {
  try {
    await addUser(data);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to add user:', error);
  }
}
