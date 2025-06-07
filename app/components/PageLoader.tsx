"use client";

import { useLoading } from "../contexts/LoadingContext";
import AppLoader from "./GhibliLoader";

export default function PageLoader() {
  const { isLoading } = useLoading();

  return <AppLoader isLoading={isLoading} />;
}
