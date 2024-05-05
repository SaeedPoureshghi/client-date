import { useState, useEffect } from "react";
import { ProfileProps } from "../types";
import axios from "axios";

interface Props {
  page: number;
}

const useProfileList = ({ page }: Props) => {
  const [profiles, setProfiles] = useState<ProfileProps[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState<boolean>(true);

  useEffect(() => {
    async function getProfiles() {
      try {
        setLoadingProfiles(true);
        const response = await axios.get(
          `https://randomuser.me/api/?results=10&page=${page}`
        );

        if (response.data.results) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const profiles = response.data.results.map((profile: any) => ({
            nickname: profile.name.first,
            age: profile.dob.age,
            pic: profile.picture.large,
            gender: profile.gender.toUpperCase(),
            city: profile.location.city,
          }));

          setProfiles((prev) => [...prev, ...profiles]);

          setLoadingProfiles(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfiles(false);
      }
    }
    if (page > 0) {
      getProfiles();
    }
  }, [page]);

  return { profiles, loadingProfiles };
};
export default useProfileList;
