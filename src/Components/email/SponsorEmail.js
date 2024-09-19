import { Heading, Text, Html } from "@react-email/components";
import * as React from "react";

interface SponsorEmailProps {
    name: string;
    company: string;
}

export default function SponsorEmail({name, company, message}: SponsorEmailProps) {
  return (
    <Html>
      <Heading as="h1" style={{ fontFamily: "sans-serif" }}>
        Hello, SWECC!
      </Heading>
      <Text
        style={{
          fontFamily: "sans-serif",
          background: "blueviolet",
          color: "white",
          padding: "12px 20px",
        }}
      >
          { name } from { company } tries to connect: <br/>
          {message}
      </Text>
    </Html>
  );
}
