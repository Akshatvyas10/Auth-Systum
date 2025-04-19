import axios from 'axios';
import React, {  useState } from 'react';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'
interface userDetails {
  user_id: string;
  user_name: string;
  email: string;
  created_at: string;
  user_role: string;
}

const UsersCard: React.FC = () => {
  const [onChange, setOnChange] = useState<boolean>(false);
  const [roles, setRoles] = useState<{ [userId: string]: string }>({});

  const handleChangeRole = (e: any, userId: string) => {
    const newRole = e.target.value;
    setRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: newRole,
    }));

    const detail = { user_id: userId, user_role: newRole };

    axios.put('http://localhost:3002/user/update-role', { data: detail })
      .then(() => {
        toast.success('User role updated successfully');
        setOnChange(prev => !prev);
      })
      .catch((err) => {
        toast.error('Failed to update user role');
        console.error(err);
      });
  };

  const deleteUser = (userId: string) => {
    const detail = { user_Id: userId };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:3002/user/delete-User', { data: detail })
        .then(() => {
        
          setOnChange(prev => !prev);
          Swal.fire({
            title: "Deleted!",
            text: "Your User Post has been deleted.",
            icon: "success"
          });
        })
        .catch((err) => {
          toast.error('Failed to delete user');
          console.error(err);
        });
       
      }
    });
   
    };

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3002/user/show-user');
      return response ? response.data.data : [];
    } catch {
      console.error();
      toast.error('Failed to load users');
      return [];
    }
  };

  const { data = [] } = useQuery({
    queryKey: ['user', onChange],
    queryFn: fetchUser,
    staleTime: 10000,
  });

  return (
    <div className="overflow-x-auto mx-4 mt-2">
      <div className='text-2xl font-semibold text-gray-700 text-center p-5'>
        Active Users
      </div>
      <table className="min-w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700 border-2">
            <th className="px-4 py-2 border-2">S.No</th>
            <th className="px-4 py-2 border-2">ID</th>
            <th className="px-4 py-2 border-2">Name</th>
            <th className="px-4 py-2 border-2">Email</th>
            <th className="px-4 py-2 border-2">Created At</th>
            <th className="px-4 py-2 border-2">Delete</th>
            <th className="px-4 py-2 border-2">Change Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user: userDetails, index: string) => (
            <tr key={user.user_id} className="odd:bg-white even:bg-gray-50 hover:text-orange-700">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{user.user_id}</td>
              <td className="px-4 py-2 border-b">{user.user_name}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{user.created_at}</td>
              <td className="px-4 py-2 border-b text-gray-500 hover:text-red-500 cursor-pointer">
                <MdDelete onClick={() => deleteUser(user.user_id)} />
              </td>
              <td className="px-4 py-2 border-b">
                <select
                  value={roles[user.user_id] || user.user_role}
                  onChange={(e) => handleChangeRole(e, user.user_id)}
                >
                  <option value="user">User</option>
                  <option value="moderatora">Moderator</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersCard;
