/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "../component/Header";
import "../App.css";
import WebApp from "@twa-dev/sdk";
import { Skeleton } from "antd";
import ProfileList from "../component/ProfileList";
import useUser from "../hooks/useUser";

const Home = () => {
  WebApp.ready();
  WebApp.expand();
  const initData = WebApp.initDataUnsafe;
  const { loading, user, profile, meta } = useUser({ initData });

  if (loading) {
    return (
      <>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </>
    );
  }

  if (user && profile && meta && meta.fee)
    return (
      <div className="main_container">
        <Header user={user} profile={profile} />
        <ProfileList balance={profile.balance} fee={meta.fee} />
      </div>
    );
};

export default Home;
