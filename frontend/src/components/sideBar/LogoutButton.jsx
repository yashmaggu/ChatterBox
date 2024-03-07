
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
			   <button 
         className="btn btn-active btn-neutral"
         onClick={logout}
   >
     Logout
   </button>
			) : (
				<span  className="btn btn-active btn-neutral">
					Logging out
				</span>
			)}
		</div>
	);
};
export default LogoutButton;
