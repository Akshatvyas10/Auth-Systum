import { useState, useEffect, JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Nav: React.FC = () => {
  const navigator = useNavigate();
  const [nav, setNav] = useState<JSX.Element>()
  
  const role = localStorage.getItem('role')

  const logout = () => {
    const currentPath = location.pathname;
    
      Swal.fire({
              title: "Are you sure? Do you want to Logout",
              text: "You won't be able to revert to this page!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes,Logout!"
            }).then(async(result) => {
              if (result.isConfirmed) {
   
                Swal.fire({
                  title: "Logout!",
              
                  icon: "success"
                });
                localStorage.clear();
      navigator('/');
    
  }
  else {
    navigator(currentPath);
  }
})

  };

  useEffect(() => {
    // Update navigation content based on role
    if (role === 'user') {
      setNav(
        <ul className='flex space-x-4 text-lg font-semibold'>
        <li className=' hover:text-orange-700'><Link to={'/user/dashboard'}>Dashboard</Link></li>
        <li className=' hover:text-orange-700' ><Link to={'/user/myPost'}>my Post</Link></li>
        <li className=' hover:text-orange-700'><Link to={'/user/explore'}>Explore</Link></li>
        <li className=' hover:text-orange-700'><Link to={'/d'}></Link></li>
      </ul>
      );
    } else if (role === 'moderatora') {
      setNav(
        <ul className='flex space-x-4 text-lg font-semibold'>
          <li className=' hover:text-orange-700' ><Link to={'/moderatora/dashboard'}>Dashboard</Link></li>
          <li className=' hover:text-orange-700'><Link to={'/moderatora/users-post'}>Users Posts</Link></li>
          <li className=' hover:text-orange-700'><Link to={'/d'}></Link></li>
          <li className=' hover:text-orange-700'><Link to={'/d'}></Link></li>
        </ul>
      );
    } else if (role === 'admin') {
      setNav(
        <ul className='flex space-x-8 text-lg font-semibold'>
          <li className=' hover:text-orange-700'><Link to={'/admin/dashboard'}>Dashboard</Link></li>
          <li className=' hover:text-orange-700' ><Link to={'/admin/active-users'}>Active Users</Link></li>
          <li className=' hover:text-orange-700'><Link to={'/admin/explore-users'}>Users Posts</Link></li>
          {/* <li className=' hover:text-orange-700'><Link to={'/admin/users'}>Users Posts</Link></li> */}
          <li className=' hover:text-orange-700'><Link to={'/d'}></Link></li>
        </ul>
      );
    }
  }, [role]); // Depend on the 'role' to re-render if it changes

  return (
    <nav className="bg-white shadow-md flex justify-between mt-0 pt-4 md:px-20 px-2 py-2 my-2 dark:text-gray-600 dark:bg-slate-950 dark:shadow-slate-900">
      <div className="cursor-pointer flex">
        <Link to="/dashboard">
          <img
            src="../src/assets/post-icon-24.jpg"
            className="h-10 w-auto hover:scale-125 duration-300"
            alt="Logo"
          />
        </Link>
      </div>

      <div className="flex">{nav}</div>

      <div className="flex md:space-x-4 cursor-pointer">
        <div onClick={logout} className="menu-container mt-1 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#999999"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </div>
        <div className="space-x-4 cursor-pointer hidden md:flex">
          <div
            className="bg-red-600 py-2 px-6 rounded-lg text-white hover:scale-110 duration-300"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
