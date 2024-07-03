import { getUsers } from '@/lib/db';
import { UsersTable } from './users-table';
import { Search } from './search';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { users, newOffset } = await getUsers(search, Number(offset));

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Users</h1>
        <button className="bg-gray-100 px-4 py-2 rounded font-mono hover:bg-transparent outline-1">Add</button>
      </div>
      <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div>
      <UsersTable users={users} offset={newOffset} />
    </main>
  );
}
