import { useState, useEffect } from "react";
import { User, useUserProps, ProfileType, Meta } from "../types";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const useUser = ({ initData }: useUserProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState<Partial<Meta | null>>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("fetching user");
      const response = await axios.post(`${SERVER_URL}/info`, { initData });

      if (response.data.success) {
        const data = response.data;
        setUser(data.data.user);
        setMeta(data.meta);
        if (data.profile) {
          setProfile(data.profile);
        }
        setLoading(false);
      }
    };
    setLoading(true);
    fetchUser();
  }, [initData]);

  return { user, profile, loading, meta };
};
export default useUser;
