"use client";

import { RecoilRoot } from "recoil";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RecoilProvider = (props: Props) => {
  return <RecoilRoot>{props.children}</RecoilRoot>;
};

export default RecoilProvider;
