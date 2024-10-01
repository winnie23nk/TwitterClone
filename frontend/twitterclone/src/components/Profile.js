import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice.js";
import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();
  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user?._id,
        });
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };
  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <FaArrowLeft size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">16 posts</p>
          </div>
        </div>
        <img
          src="https://www.thedeveloperlink.io/wp-content/uploads/2023/09/Group-149-1.jpg"
          alt="banner"
        />
        <div className="absolute top-64 ml-2 mt-20 border-4 border-white rounded-full">
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5koToJHckRIyzqV9ezGxO9kIzBsFojilOQ&usqp=CAU"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right mt-4">
          {profile?._id === user?._id ? (
            <button className="px-4 py-1 rounded-full hover:bg-gray-200 border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-4 py-1 rounded-full bg-black text-white border border-gray-400"
            >
              {user.following.includes(id) ? "following" : "follow"}
            </button>
          )}
        </div>
        <div>
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            💻 Code, Coffee, and Creativity ☕️✨| 🌐 Web Developer by day,
            Dreamer by night ✨| 💡 Crafting digital experiences with lines of
            code ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
