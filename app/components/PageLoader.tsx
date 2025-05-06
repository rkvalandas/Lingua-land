"use client";

import { useLoading } from "../contexts/LoadingContext";
import GhibliLoader from "./GhibliLoader";

export default function PageLoader() {
  const { isLoading } = useLoading();

  return <GhibliLoader isLoading={isLoading} />;
}
