"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function SignIn({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createBrowserSupabaseClient();

  /* const signInWithKakao = async () => {
    const redirectTo =
      process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
        : "http://localhost:3000/auth/callback";  // 로컬 환경에서 테스트 시
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: redirectTo,  // 환경에 따른 리다이렉트 URL 설정
      },
    });
  
    if (error) {
      console.error("Kakao Login Error: ", error.message);
    } else {
      console.log(data);  // 로그인 성공 시 데이터를 확인합니다.
    }
  }; */
  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `https://j-stagram.vercel.app/auth/callback`,  // Vercel에 배포된 URL로 리다이렉트
      },
    });
  
    if (error) {
      console.error("Kakao Login Error: ", error.message);
    } else {
      console.log(data);  // 로그인 성공 시 데이터를 확인합니다.
    }
  };
  
  

  const signInMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data) {
        console.log(data);
      }

      if (error) {
        alert(error.message);
      }
    },
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
      <div className="flex items-center gap-2">
      <img
        src={"/images/J_stagram.png"}
        style={{ width: '110px', height: '110px' }}
        className="mb-6 justify-center items-center"
      />
        <img src={"/images/stagram_font.png"} className="w-60 mb-6" />
      </div>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="email"
          type="email"
          className="w-full rounded-sm"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          type="password"
          className="w-full rounded-sm"
        />
        <Button
          onClick={() => {
            signInMutation.mutate();
          }}
          loading={signInMutation.isPending}
          disabled={signInMutation.isPending}
          color="light-blue"
          className="w-full text-md py-1"
        >
          로그인
        </Button>
        <Button
          onClick={() => signInWithKakao()}
          className="w-full text-md py-1 bg-yellow-700"
        >
          카카오 로그인
        </Button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        아직 계정이 없으신가요?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNUP")}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
