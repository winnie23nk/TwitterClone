import React from "react";
import { CiHome } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant.js";
import { getUser, getOtherUsers, getMyProfile } from "../redux/userSlice.js";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            className="ml-3"
            width={"40px"}
            height={"30px"}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKigKKfi57R_2AMNbx-OMqjSU6XaJZVRXd28_fPO6b_qeYueg2sJAUYMzG8odHSSd-974&usqp=CAU"
            alt="twitter-logo"
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <div>
              <CiHome size="24px" />
            </div>
            <h1 className="font-bold ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <div>
              <CiSearch size="24px" />
            </div>
            <h1 className="font-bold ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <div>
              <CiBellOn size="24px" />
            </div>
            <h1 className="font-bold ml-2">Notifications</h1>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <div>
              <IoPersonOutline size="24px" />
            </div>
            <h1 className="font-bold ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer">
            <div>
              <CiBookmark size="24px" />
            </div>
            <h1 className="font-bold ml-2">Bookmarks</h1>
          </div>
          <div
            onClick={logoutHandler}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer"
          >
            <div>
              <CiLogout size="24px" />
            </div>
            <h1 className="font-bold ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none font-bold bg-[#1D9BF0] w-full rounded-full text-white ">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
