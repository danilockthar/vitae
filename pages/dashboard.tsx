import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <Link href="/app/cv/plantillas">
        <a> New CV </a>
      </Link>

      <div> mis cvs guardados </div>
    </Layout>
  );
};

export default Dashboard;
